'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { CROPS } from '@/lib/crops';
import { analyzeIrrigation, projectTrend } from '@/lib/engine';
import { addHistory } from '@/lib/storage';
import { getFarmGuidance, GUIDANCE_LANGUAGES } from '@/lib/guidance';
import { useToast } from '@/components/Toast';
import Card from '@/components/Card';
import Gauge from '@/components/Gauge';
import LoadingSpinner from '@/components/LoadingSpinner';
import RequireAuth from '@/components/RequireAuth';
import { Download, Droplets, RefreshCcw, Save, Thermometer, CloudRain, Wind, Volume2, Square } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DecisionBadge = dynamic(() => Promise.resolve(({ decision }) => (
  <div className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
    decision === 'WATER' ? 'text-brand-600' : 'text-red-600'
  }`}>{decision}</div>
)), { ssr: false });

export default function DashboardPage() {
  const { push } = useToast();

  const [crop, setCrop] = useState('maize');
  const [temperature, setTemperature] = useState(28);
  const [humidity, setHumidity] = useState(50);
  const [rainProbability, setRainProbability] = useState(20);
  const [location, setLocation] = useState('');
  const [saving, setSaving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [language, setLanguage] = useState('en');
  const [speaking, setSpeaking] = useState(false);

  const result = useMemo(() => {
    return analyzeIrrigation({ crop, temperature, humidity, rainProbability });
  }, [crop, temperature, humidity, rainProbability]);

  const trend = useMemo(
    () => projectTrend({ crop, temperature, humidity, rainProbability }),
    [crop, temperature, humidity, rainProbability]
  );
  const guidance = useMemo(() => getFarmGuidance({
    language, crop: CROPS.find((item) => item.id === crop)?.name || crop,
    score: result.score, level: result.level, rainProbability, temperature, humidity, decision: result.decision,
  }), [language, crop, result, rainProbability, temperature, humidity]);

  const speakGuidance = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      push('Spoken advice is not available in this browser. You can still read the guidance below.', 'error');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${guidance.advice} ${guidance.title}. ${guidance.waterRisk}. ${guidance.skipped} ${guidance.excessRisk}. ${guidance.excess}`);
    utterance.lang = GUIDANCE_LANGUAGES.find((item) => item.id === language)?.voice || 'en-NG';
    const voices = window.speechSynthesis.getVoices();
    const languagePrefix = utterance.lang.split('-')[0];
    const voice = voices.find((item) => item.lang.toLowerCase() === utterance.lang.toLowerCase()) || voices.find((item) => item.lang.toLowerCase().startsWith(languagePrefix));
    if (voice) utterance.voice = voice;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [guidance, language, push]);

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  // Simulate brief analysis pulse when inputs change
  useEffect(() => {
    setAnalyzing(true);
    const t = setTimeout(() => setAnalyzing(false), 220);
    return () => clearTimeout(t);
  }, [crop, temperature, humidity, rainProbability]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Try API first, fallback to localStorage
      try {
        await fetch('/api/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ crop, temperature, humidity, rainProbability, location, ...result }),
        });
      } catch {}
      addHistory({ crop, temperature, humidity, rainProbability, location, ...result });
      push('Decision saved to history ✅', 'success');
      speakGuidance();
    } catch {
      push('Failed to save decision', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setCrop('maize'); setTemperature(28); setHumidity(50); setRainProbability(20); setLocation('');
    push('Inputs reset', 'info');
  };

  const handleExportPDF = async () => {
    push('Generating PDF report…', 'info');
    const { default: jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('SmartAgri Water Guard — Irrigation Report', 14, 20);
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

    autoTable(doc, {
      startY: 36,
      head: [['Field', 'Value']],
      body: [
        ['Crop', CROPS.find(c => c.id === crop)?.name],
        ['Location', location || '—'],
        ['Temperature', `${temperature} °C`],
        ['Humidity', `${humidity} %`],
        ['Rain probability', `${rainProbability} %`],
        ['Decision', result.decision],
        ['Irrigation level', result.level],
        ['Water need score', `${result.score}%`],
      ],
    });

    const startY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(13);
    doc.text('Reasoning', 14, startY);
    autoTable(doc, {
      startY: startY + 4,
      head: [['Factor', 'Detail']],
      body: result.reasons.map(r => [r.type.toUpperCase(), r.text]),
    });

    doc.save(`smartagri-report-${Date.now()}.pdf`);
    push('Report downloaded 📄', 'success');
  };

  return (
    <RequireAuth><div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">Irrigation Dashboard</h1>
          <p className="text-earth-600 dark:text-earth-300 mt-1">
            Enter your field conditions — the AI updates in real time.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="btn-secondary">
            <RefreshCcw size={16} /> Reset
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            <Save size={16} /> {saving ? 'Saving…' : 'Save Decision'}
          </button>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        {/* INPUTS */}
        <Card className="lg:col-span-1">
          <h2 className="font-bold text-lg mb-4">🌱 Farm Inputs</h2>

          <div className="space-y-4">
            <div>
              <label className="label">Crop Type</label>
              <select value={crop} onChange={(e) => setCrop(e.target.value)} className="input">
                {CROPS.map((c) => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label flex items-center gap-1">
                <Thermometer size={14} /> Temperature (°C)
              </label>
              <input
                type="number" min="-10" max="60" value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="input"
              />
              <input
                type="range" min="-10" max="60" value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full mt-2 accent-brand-600"
              />
            </div>

            <div>
              <label className="label flex items-center gap-1">
                <Wind size={14} /> Humidity (%)
              </label>
              <input
                type="number" min="0" max="100" value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="input"
              />
              <input
                type="range" min="0" max="100" value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full mt-2 accent-brand-600"
              />
            </div>

            <div>
              <label className="label flex items-center gap-1">
                <CloudRain size={14} /> Rain Probability (%)
              </label>
              <input
                type="range" min="0" max="100" value={rainProbability}
                onChange={(e) => setRainProbability(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
              <div className="text-sm mt-1 font-semibold text-brand-700 dark:text-brand-300">
                {rainProbability}%
              </div>
            </div>

            <div>
              <label className="label">Farm Location (optional)</label>
              <input
                type="text" value={location} placeholder="e.g. Nakuru, Kenya"
                onChange={(e) => setLocation(e.target.value)}
                className="input"
              />
            </div>
          </div>
        </Card>

        {/* AI DECISION PANEL */}
        <Card className="lg:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl bg-brand-600 text-white">
            {analyzing ? 'RECALCULATING…' : 'AI DECISION'}
          </div>

          <h2 className="font-bold text-lg mb-1">🧠 AI Decision</h2>
          <p className="text-sm text-earth-600 dark:text-earth-300">Live rule-based engine output.</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-6 items-center">
            <div className="space-y-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-earth-500">
                  Watering Recommendation
                </div>
                <DecisionBadge decision={result.decision} />
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-1">
                  Irrigation Level
                </div>
                <div className="flex items-center gap-2">
                  {['LOW', 'MEDIUM', 'HIGH'].map((lvl) => {
                    const active = result.level === lvl;
                    const color =
                      lvl === 'LOW' ? 'bg-brand-600' :
                      lvl === 'MEDIUM' ? 'bg-amber-500' : 'bg-red-600';
                    return (
                      <span
                        key={lvl}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          active ? `${color} text-white shadow` : 'bg-earth-100 dark:bg-earth-700 text-earth-600 dark:text-earth-300'
                        }`}
                      >
                        {lvl}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-1">
                  Explanation
                </div>
                <p className="text-sm text-earth-700 dark:text-earth-200">{result.explanation}</p>
              </div>
              <div className="rounded-xl border border-brand-100 dark:border-earth-600 bg-brand-50 dark:bg-earth-900/60 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="text-sm font-semibold" htmlFor="advice-language">{guidance.language}</label>
                  <select id="advice-language" value={language} onChange={(event) => { setLanguage(event.target.value); stopSpeaking(); }} className="input !w-auto !py-2">
                    {GUIDANCE_LANGUAGES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                  </select>
                </div>
                <p className="text-sm leading-6 text-earth-700 dark:text-earth-200">{guidance.advice}</p>
                <button type="button" onClick={speaking ? stopSpeaking : speakGuidance} className="btn-primary">
                  {speaking ? <Square size={16} /> : <Volume2 size={17} />}
                  {speaking ? guidance.stop : guidance.speak}
                </button>
                <p className="text-xs text-earth-600 dark:text-earth-300">Spoken advice uses voices installed in your browser or device. If a local language voice is unavailable, the advice remains available to read.</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Gauge value={result.score} level={result.level} />
            </div>
          </div>

          {/* Reasons list */}
          <div className="mt-6 pt-5 border-t border-earth-100 dark:border-earth-700">
            <h3 className="font-bold text-sm mb-3">🔍 Reasoning Breakdown</h3>
            <ul className="space-y-2">
              {result.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0" />
                  <span className="text-earth-700 dark:text-earth-200">{r.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-bold text-lg mb-1">🌱 {guidance.title}</h2>
        <p className="text-sm text-earth-600 dark:text-earth-300 mb-4">Small, timely adjustments can help protect your harvest. These are possible risks, not a prediction of what will happen to your field.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 p-4">
            <h3 className="font-semibold text-sm mb-2">{guidance.waterRisk}</h3>
            <p className="text-sm leading-6 text-earth-700 dark:text-earth-200">{guidance.skipped}</p>
          </div>
          <div className="rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900 p-4">
            <h3 className="font-semibold text-sm mb-2">{guidance.excessRisk}</h3>
            <p className="text-sm leading-6 text-earth-700 dark:text-earth-200">{guidance.excess}</p>
          </div>
        </div>
      </Card>

      {/* VISUALIZATION */}
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">📈 7-Day Moisture vs Water Need Trend</h2>
            <span className="text-xs text-earth-500">Projection</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12, border: 'none',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="moisture" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} name="Soil moisture %" />
                <Line type="monotone" dataKey="need" stroke="#a97a44" strokeWidth={3} dot={{ r: 4 }} name="Water need %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="font-bold text-lg mb-4">📊 Quick Stats</h2>
          <div className="space-y-3">
            <StatRow icon={<Thermometer size={16} />} label="Temperature" value={`${temperature} °C`} />
            <StatRow icon={<Wind size={16} />} label="Humidity" value={`${humidity} %`} />
            <StatRow icon={<CloudRain size={16} />} label="Rain probability" value={`${rainProbability} %`} />
            <StatRow icon={<Droplets size={16} />} label="Water need score" value={`${result.score}%`} />
            <StatRow icon={<Droplets size={16} />} label="Irrigation level" value={result.level} />
          </div>

          <button onClick={handleExportPDF} className="btn-secondary w-full mt-5">
            <Download size={16} /> Export PDF Report
          </button>
        </Card>
      </div>

      {analyzing && (
        <div className="mt-6 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div></RequireAuth>
  );
}

function StatRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-earth-50 dark:bg-earth-900">
      <span className="flex items-center gap-2 text-sm text-earth-600 dark:text-earth-300">
        {icon} {label}
      </span>
      <span className="font-bold text-sm">{value}</span>
    </div>
  );
}
