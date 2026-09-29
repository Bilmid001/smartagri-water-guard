'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import { getHistory, clearHistory } from '@/lib/storage';
import { getCrop } from '@/lib/crops';
import { Trash2, FileText } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const { push } = useToast();

  const refresh = () => setItems(getHistory());
  useEffect(() => { refresh(); }, []);

  const handleClear = () => {
    if (!confirm('Clear all saved decisions?')) return;
    clearHistory();
    refresh();
    push('History cleared', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">Decision History</h1>
          <p className="text-earth-600 dark:text-earth-300 mt-1">
            All previously saved irrigation decisions.
          </p>
        </div>
        {items.length > 0 && (
          <button onClick={handleClear} className="btn-secondary text-red-600 dark:text-red-400">
            <Trash2 size={16} /> Clear history
          </button>
        )}
      </div>

      <Card className="mt-6 !p-0 overflow-hidden">
        {items.length === 0 ? (
          <div className="p-10 text-center">
            <FileText size={40} className="mx-auto text-earth-300 dark:text-earth-600" />
            <h2 className="mt-4 font-bold text-lg">No saved decisions yet</h2>
            <p className="text-sm text-earth-600 dark:text-earth-300 mt-1">
              Run an analysis on the dashboard and click “Save Decision”.
            </p>
            <Link href="/dashboard" className="btn-primary mt-5 inline-flex">Go to Dashboard</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-earth-50 dark:bg-earth-900 text-earth-600 dark:text-earth-300">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Date</th>
                  <th className="text-left px-4 py-3 font-semibold">Crop</th>
                  <th className="text-left px-4 py-3 font-semibold">Temp</th>
                  <th className="text-left px-4 py-3 font-semibold">Humidity</th>
                  <th className="text-left px-4 py-3 font-semibold">Rain</th>
                  <th className="text-left px-4 py-3 font-semibold">Decision</th>
                  <th className="text-left px-4 py-3 font-semibold">Level</th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => {
                  const crop = getCrop(r.crop);
                  return (
                    <tr key={r.id} className="border-t border-earth-100 dark:border-earth-700 hover:bg-earth-50 dark:hover:bg-earth-800/60 transition">
                      <td className="px-4 py-3 whitespace-nowrap text-earth-600 dark:text-earth-300">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{crop?.emoji} {crop?.name}</td>
                      <td className="px-4 py-3">{r.temperature} °C</td>
                      <td className="px-4 py-3">{r.humidity}%</td>
                      <td className="px-4 py-3">{r.rainProbability}%</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          r.decision === 'WATER' ? 'bg-brand-100 text-brand-700' : 'bg-red-100 text-red-700'
                        }`}>{r.decision}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          r.level === 'HIGH' ? 'bg-red-100 text-red-700' :
                          r.level === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                          'bg-brand-100 text-brand-700'
                        }`}>{r.level}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}