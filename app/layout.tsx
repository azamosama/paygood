import './globals.css';
import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'PayGood Analytics Dashboard',
  description: 'Mission-aligned analytics for PayGood',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pg-background text-pg-text antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}

