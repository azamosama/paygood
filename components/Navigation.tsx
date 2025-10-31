"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Code } from 'lucide-react';

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">PayGood</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600 font-medium">Demo</span>
          </div>
          <div className="flex gap-1">
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                pathname === '/' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/integration"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                pathname === '/integration' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Code className="h-4 w-4" />
              Integration
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};


