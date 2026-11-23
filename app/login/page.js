'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Sprout } from 'lucide-react';

export default function LoginPage() {
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [info, setInfo] = useState('');
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(''); setInfo('');
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to sign in.');
      if (result.confirmationRequired) { setInfo(result.message); return; }
      const next = new URLSearchParams(window.location.search).get('next');
      window.location.assign(next && next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard');
    } catch (err) { setError(err.message || 'Unable to reach the sign-in service.'); }
    finally { setBusy(false); }
  }
  return <main className="auth-wrap"><aside className="auth-aside"><Link href="/" className="auth-brand"><Sprout size={20}/> SmartAgri Water Guard</Link><div><h2>Grow with a little more certainty.</h2><p>Bring your fields, crop needs and weather into one clear view, so your next irrigation decision feels easier.</p></div><blockquote>“Good decisions start with understanding what your field actually needs.”<cite>SMARTAGRI WATER GUARD</cite></blockquote></aside><section className="auth-panel"><form className="auth-form" onSubmit={submit}><Link className="auth-back" href="/">← Back to home</Link><h1>Welcome back</h1><p>Sign in to continue to your farm dashboard.</p>{error&&<div className="auth-error" role="alert">{error}</div>}{info&&<div className="auth-info" role="status">{info} <Link href="/login">Sign in</Link></div>}<label className="label" htmlFor="email">Email address</label><input className="input" id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com"/><label className="label mt-5" htmlFor="password">Password</label><input className="input" id="password" name="password" type="password" autoComplete="current-password" minLength={8} required placeholder="At least 8 characters"/><button className="auth-submit" disabled={busy}>{busy?'Signing in…':<>Sign in <ArrowRight size={16}/></>}</button><p className="auth-switch">New to SmartAgri? <Link href="/register">Create an account</Link></p></form></section></main>;
}
