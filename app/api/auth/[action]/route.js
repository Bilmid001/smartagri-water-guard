import { NextResponse } from 'next/server';

const COOKIE = 'sawg_session';
const REFRESH = 'sawg_refresh';

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  return url && key ? { url: url.replace(/\/$/, ''), key } : null;
}

function cookieOptions(maxAge) {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge };
}

async function supabaseAuth(path, body) {
  const cfg = config();
  if (!cfg) return { configured: false };
  const response = await fetch(`${cfg.url}/auth/v1/${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', apikey: cfg.key },
    body: JSON.stringify(body), cache: 'no-store',
  });
  const data = await response.json().catch(() => ({}));
  return { configured: true, ok: response.ok, status: response.status, data };
}

function publicError(data, status) {
  const message = data?.msg || data?.message || data?.error_description || data?.error || 'We could not complete that request.';
  return NextResponse.json({ error: message }, { status: status === 429 ? 429 : status === 400 ? 400 : 401 });
}

export async function POST(request, { params }) {
  const action = params.action;
  if (action === 'logout') {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE, '', cookieOptions(0)); response.cookies.set(REFRESH, '', cookieOptions(0));
    return response;
  }
  if (!['login', 'register'].includes(action)) return NextResponse.json({ error: 'Unknown authentication action.' }, { status: 404 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Please enter a valid email and password.' }, { status: 400 }); }
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: 'Your password must be at least 8 characters.' }, { status: 400 });
  if (action === 'register' && !String(body.name || '').trim()) return NextResponse.json({ error: 'Enter your name to create an account.' }, { status: 400 });
  const endpoint = action === 'login' ? 'token?grant_type=password' : 'signup';
  const result = await supabaseAuth(endpoint, action === 'register'
    ? { email, password, data: { full_name: String(body.name).trim() } }
    : { email, password });
  if (!result.configured) return NextResponse.json({ error: 'Account sign-in is not configured yet. Add SUPABASE_URL and SUPABASE_ANON_KEY to your deployment environment.' }, { status: 503 });
  if (!result.ok) return publicError(result.data, result.status);
  if (!result.data.access_token) {
    return NextResponse.json({ ok: true, confirmationRequired: true, message: 'Check your email for a confirmation link, then sign in.' });
  }
  const response = NextResponse.json({ ok: true, user: { id: result.data.user?.id, email: result.data.user?.email, name: result.data.user?.user_metadata?.full_name || '' } });
  response.cookies.set(COOKIE, result.data.access_token, cookieOptions(Math.max(60, result.data.expires_in || 3600)));
  if (result.data.refresh_token) response.cookies.set(REFRESH, result.data.refresh_token, cookieOptions(60 * 60 * 24 * 30));
  return response;
}

export async function GET(request, { params }) {
  if (params.action !== 'me') return NextResponse.json({ error: 'Unknown authentication action.' }, { status: 404 });
  const cfg = config();
  if (!cfg) return NextResponse.json({ configured: false, user: null }, { status: 200 });
  let token = request.cookies.get(COOKIE)?.value;
  if (token) {
    const response = await fetch(`${cfg.url}/auth/v1/user`, { headers: { apikey: cfg.key, Authorization: `Bearer ${token}` }, cache: 'no-store' });
    if (response.ok) {
      const user = await response.json();
      return NextResponse.json({ configured: true, user: { id: user.id, email: user.email, name: user.user_metadata?.full_name || '' } });
    }
  }
  const refresh = request.cookies.get(REFRESH)?.value;
  if (refresh) {
    const renewed = await supabaseAuth('token?grant_type=refresh_token', { refresh_token: refresh });
    if (renewed.ok && renewed.data.access_token) {
      const response = NextResponse.json({ configured: true, user: { id: renewed.data.user?.id, email: renewed.data.user?.email, name: renewed.data.user?.user_metadata?.full_name || '' } });
      response.cookies.set(COOKIE, renewed.data.access_token, cookieOptions(Math.max(60, renewed.data.expires_in || 3600)));
      if (renewed.data.refresh_token) response.cookies.set(REFRESH, renewed.data.refresh_token, cookieOptions(60 * 60 * 24 * 30));
      return response;
    }
  }
  const response = NextResponse.json({ configured: true, user: null });
  response.cookies.set(COOKIE, '', cookieOptions(0)); response.cookies.set(REFRESH, '', cookieOptions(0));
  return response;
}
