'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sprout } from 'lucide-react';

export default function RequireAuth({ children }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    fetch('/api/auth/me', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        if (!active) return;
        if (data.user) setReady(true);
        else router.replace(`/login?next=${encodeURIComponent(pathname || '/dashboard')}`);
      })
      .catch(() => {
        if (active) router.replace(`/login?next=${encodeURIComponent(pathname || '/dashboard')}`);
      });
    return () => { active = false; };
  }, [pathname, router]);

  if (!ready) return <main className="auth-loading" aria-live="polite"><Sprout size={25}/><span>Checking your account…</span></main>;
  return children;
}
