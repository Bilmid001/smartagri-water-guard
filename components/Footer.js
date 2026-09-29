import { Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-earth-100 dark:border-earth-700 bg-white dark:bg-earth-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-earth-600 dark:text-earth-300">
        <div className="flex items-center gap-2">
          <Sprout size={16} className="text-brand-600" />
          <span>© {new Date().getFullYear()} SmartAgri Water Guard</span>
        </div>
        <span>Sustainable irrigation for a smarter tomorrow 🌱</span>
      </div>
    </footer>
  );
}