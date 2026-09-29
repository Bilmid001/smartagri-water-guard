export default function LoadingSpinner({ label = 'Analyzing…' }) {
  return (
    <div className="flex items-center gap-3 text-earth-600 dark:text-earth-300">
      <span className="inline-block w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}