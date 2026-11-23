'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sprout } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

export default function RequireAuth({ children }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (getCurrentUser()) setReady(true);
    else router.replace(`/login?next=${encodeURIComponent(pathname || '/dashboard')}`);
  }, [pathname, router]);

  if (!ready) return <main className="auth-loading" aria-live="polite"><Sprout size={25}/><span>Checking your account…</span></main>;
  return children;
}
