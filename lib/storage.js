const KEY = 'smartagri_history_v1';

export function getHistory() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function addHistory(entry) {
  if (typeof window === 'undefined') return [];
  const list = getHistory();
  const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...entry };
  const next = [record, ...list].slice(0, 200);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}