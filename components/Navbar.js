'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/history', label: 'History' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-earth-900/80 border-b border-earth-100 dark:border-earth-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="p-2 rounded-xl bg-brand-600 text-white group-hover:scale-105 transition">
            <Sprout size={20} />
          </span>
          <span className="font-extrabold tracking-tight text-lg">
            SmartAgri <span className="text-brand-600">Water Guard</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'bg-brand-600 text-white shadow'
                    : 'text-earth-700 dark:text-earth-200 hover:bg-earth-100 dark:hover:bg-earth-700'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <button
            onClick={toggle}
            className="ml-2 p-2 rounded-lg hover:bg-earth-100 dark:hover:bg-earth-700 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-earth-100 dark:hover:bg-earth-700"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-earth-100 dark:border-earth-700 px-4 py-3 space-y-1 bg-white dark:bg-earth-900">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                pathname === l.href
                  ? 'bg-brand-600 text-white'
                  : 'text-earth-700 dark:text-earth-200 hover:bg-earth-100 dark:hover:bg-earth-700'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button onClick={toggle} className="w-full text-left px-4 py-2 rounded-lg hover:bg-earth-100 dark:hover:bg-earth-700 text-sm">
            {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>
        </div>
      )}
    </header>
  );
}