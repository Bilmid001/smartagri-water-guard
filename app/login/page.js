'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Sprout, LoaderCircle, CheckCircle2 } from 'lucide-react';
import { loginUser } from '@/lib/auth';

export default function LoginPage() {
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [welcome, setWelcome] = useState(null), [registered, setRegistered] = useState(false);
  useEffect(() => setRegistered(new URLSearchParams(window.location.search).get('registered') === '1'), []);
  function continueToApp() {
    const next = new URLSearchParams(window.location.search).get('next');
    window.location.assign(next && next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard');
  }
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const user = await loginUser(Object.fromEntries(new FormData(event.currentTarget)));
      setWelcome(user);
    } catch (err) { setError(err.message || 'Unable to sign in.'); }
    finally { setBusy(false); }
  }
  return <main className="auth-wrap"><aside className="auth-aside"><Link href="/" className="auth-brand"><Sprout size={20}/> SmartAgri Water Guard</Link><div><h2>Grow with a little more certainty.</h2><p>Bring your fields, crop needs and weather into one clear view, so your next irrigation decision feels easier.</p></div><blockquote>‚ÄúGood decisions start with understanding what your field actually needs.‚Äù<cite>SMARTAGRI WATER GUARD</cite></blockquote></aside><section className="auth-panel"><form className="auth-form" onSubmit={submit}><Link className="auth-back" href="/">‚Üê Back to home</Link><h1>Welcome back</h1><p>Sign in to continue to your farm dashboard.</p>{registered&&<div className="auth-success" role="status"><CheckCircle2 size={18}/> Your account is ready. Sign in with the credentials you just created.</div>}{error&&<div className="auth-error" role="alert">{error}</div>}<label className="label" htmlFor="email">Email address</label><input className="input" id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com"/><label className="label mt-5" htmlFor="password">Password</label><input className="input" id="password" name="password" type="password" autoComplete="current-password" minLength={8} required placeholder="At least 8 characters"/><button className="auth-submit" disabled={busy}>{busy?<><LoaderCircle className="auth-loader-icon" size={18}/> Signing you inÖ</>:<>Sign in <ArrowRight size={16}/></>}</button><p className="auth-switch">New to SmartAgri? <Link href="/register">Create an account</Link></p></form></section>{welcome&&<div className="welcome-overlay" role="presentation"><section className="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title"><span className="welcome-icon"><CheckCircle2 size={30}/></span><p className="welcome-kicker">SMARTAGRI WATER GUARD</p><h2 id="welcome-title">Welcome, {welcome.name || welcome.email}!</h2><p>Your next great growing season starts with one thoughtful decision. Weíre glad youíre hereóletís make every drop count.</p><button className="auth-submit" onClick={continueToApp}>Open my dashboard <ArrowRight size={17}/></button></section></div>}</main>;
}
