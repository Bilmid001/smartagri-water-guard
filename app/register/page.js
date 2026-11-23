'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Sprout } from 'lucide-react';

export default function RegisterPage() {
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [success, setSuccess] = useState('');
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(''); setSuccess('');
    const form = Object.fromEntries(new FormData(event.currentTarget));
    if (form.password !== form.confirmPassword) { setError('Those passwords do not match.'); setBusy(false); return; }
    try {
      const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to create your account.');
      if (result.confirmationRequired) { setSuccess(result.message); return; }
      window.location.assign('/dashboard');
    } catch (err) { setError(err.message || 'Unable to reach the registration service.'); }
    finally { setBusy(false); }
  }
  return <main className="auth-wrap"><aside className="auth-aside"><Link href="/" className="auth-brand"><Sprout size={20}/> SmartAgri Water Guard</Link><div><h2>Make every drop count.</h2><p>Your farm has its own rhythm. Start keeping track of the conditions that shape it, one field at a time.</p></div><blockquote>“A clearer view of water needs can help a farm make every season count.”<cite>SMARTAGRI WATER GUARD</cite></blockquote></aside><section className="auth-panel"><form className="auth-form" onSubmit={submit}><Link className="auth-back" href="/">← Back to home</Link><h1>Let’s get growing.</h1><p>Create an account to open your SmartAgri workspace.</p>{error&&<div className="auth-error" role="alert">{error}</div>}{success&&<div className="auth-success" role="status">{success} <Link href="/login">Go to sign in</Link></div>}<label className="label" htmlFor="name">Your name</label><input className="input" id="name" name="name" autoComplete="name" required placeholder="Amina Farmer"/><label className="label mt-4" htmlFor="email">Email address</label><input className="input" id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com"/><label className="label mt-4" htmlFor="password">Password</label><input className="input" id="password" name="password" type="password" autoComplete="new-password" minLength={8} required placeholder="At least 8 characters"/><label className="label mt-4" htmlFor="confirmPassword">Confirm password</label><input className="input" id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required placeholder="Enter your password again"/><button className="auth-submit" disabled={busy}>{busy?'Creating account…':<>Create account <ArrowRight size={16}/></>}</button><p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p></form></section></main>;
}
