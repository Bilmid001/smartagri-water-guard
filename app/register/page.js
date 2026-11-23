'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Sprout, LoaderCircle, CheckCircle2 } from 'lucide-react';
import { registerUser } from '@/lib/auth';

export default function RegisterPage() {
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [created, setCreated] = useState(false);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    const form = Object.fromEntries(new FormData(event.currentTarget));
    if (form.password !== form.confirmPassword) { setError('Those passwords do not match.'); setBusy(false); return; }
    try {
      await registerUser(form);
      setCreated(true);
      window.setTimeout(() => window.location.assign('/login?registered=1'), 1800);
    } catch (err) { setError(err.message || 'Unable to create your account.'); }
    finally { setBusy(false); }
  }
  return <main className="auth-wrap"><aside className="auth-aside"><Link href="/" className="auth-brand"><Sprout size={20}/> SmartAgri Water Guard</Link><div><h2>Make every drop count.</h2><p>Your farm has its own rhythm. Start keeping track of the conditions that shape it, one field at a time.</p></div><blockquote>“A clearer view of water needs can help a farm make every season count.”<cite>SMARTAGRI WATER GUARD</cite></blockquote></aside><section className="auth-panel"><form className="auth-form" onSubmit={submit}><Link className="auth-back" href="/">← Back to home</Link><h1>Let’s get growing.</h1><p>Create an account to open your SmartAgri workspace.</p>{created&&<div className="auth-success" role="status"><CheckCircle2 size={18}/> Account created! Please sign in with your new credentials.</div>}{error&&<div className="auth-error" role="alert">{error}</div>}<label className="label" htmlFor="name">Your name</label><input className="input" id="name" name="name" autoComplete="name" required placeholder="Amina Farmer"/><label className="label mt-4" htmlFor="email">Email address</label><input className="input" id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com"/><label className="label mt-4" htmlFor="password">Password</label><input className="input" id="password" name="password" type="password" autoComplete="new-password" minLength={8} required placeholder="At least 8 characters"/><label className="label mt-4" htmlFor="confirmPassword">Confirm password</label><input className="input" id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required placeholder="Enter your password again"/><button className="auth-submit" disabled={busy||created}>{busy?<><LoaderCircle className="auth-loader-icon" size={18}/> Creating your account�</>:created?<>Account created <CheckCircle2 size={18}/></>:<>Create account <ArrowRight size={16}/></>}</button>{created?<Link className="auth-switch auth-success-link" href="/login?registered=1">Continue to sign in</Link>:<p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></>}</form></section></main>;
}
