import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'ScamLens — your fraud instincts are out of date',
  description:
    'Paste any suspicious message and get an instant verdict naming the exact scam pattern — digital arrest, UPI collect fraud, KYC expiry, task jobs and more. 100% in your browser, nothing uploaded.',
};

const themeInit = `
try {
  var t = localStorage.getItem('sl-theme');
  if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
