'use client';
import Link from 'next/link';
import { Droplets, CloudRain, Leaf, BarChart3, ArrowRight, Sprout } from 'lucide-react';

const features = [
  { icon: Droplets, title: 'Smart Irrigation Prediction', desc: 'AI-based decision on when and how much to water your crops.' },
  { icon: CloudRain, title: 'Weather-based Analysis', desc: 'Real-time temperature, humidity and rain probability integration.' },
  { icon: Leaf, title: 'Crop Water Optimization', desc: 'Tailored water baselines for maize, rice, tomato and cassava.' },
  { icon: BarChart3, title: 'Farming Insights Dashboard', desc: 'Visual trends, gauges and history for confident decisions.' },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-earth-50 to-brand-100 dark:from-earth-900 dark:via-earth-900 dark:to-brand-900/40" />
        {/* Animated blobs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-brand-300/40 dark:bg-brand-700/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 -right-24 w-96 h-96 bg-earth-300/40 dark:bg-earth-700/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-brand-200/40 dark:bg-brand-800/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/10 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
              <Sprout size={14} /> AgriTech MVP
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              🌾 SmartAgri <span className="text-brand-600">Water Guard</span>
            </h1>
            <p className="mt-5 text-lg text-earth-700 dark:text-earth-200 max-w-xl">
              AI-powered irrigation decision system for smart farming. Know exactly <strong>when</strong> to water, and <strong>how much</strong>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="btn-primary text-base px-6 py-3">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn-secondary text-base px-6 py-3">
                Learn more
              </Link>
            </div>
          </div>

          {/* Hero illustration */}
          <div className="relative animate-fade-in">
            <div className="card !p-6 max-w-sm mx-auto rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-earth-500">Field status</span>
                <span className="text-xs px-2 py-1 rounded-full bg-brand-100 text-brand-700 font-bold">LIVE</span>
              </div>
              <div className="mt-4 text-3xl font-extrabold text-brand-600">WATER</div>
              <div className="text-sm text-earth-600 dark:text-earth-300">Irrigation level: <b>Medium</b></div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-earth-50 dark:bg-earth-900">28°C</div>
                <div className="p-2 rounded-lg bg-earth-50 dark:bg-earth-900">45%</div>
                <div className="p-2 rounded-lg bg-earth-50 dark:bg-earth-900">20%</div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-earth-100 dark:bg-earth-700 overflow-hidden">
                <div className="h-full w-2/3 bg-brand-500 animate-pulse-slow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Built for modern farms</h2>
          <p className="mt-3 text-earth-600 dark:text-earth-300">
            Every feature is designed to save water, boost yield, and reduce guesswork.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-bold text-lg">{title}</h3>
              <p className="mt-1.5 text-sm text-earth-600 dark:text-earth-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-brand-700 text-white p-10 md:p-14 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to water smarter?</h2>
          <p className="mt-3 opacity-90">Run your first AI irrigation analysis in under 30 seconds.</p>
          <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-700 font-bold hover:bg-earth-50 transition">
            Open Dashboard <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}v