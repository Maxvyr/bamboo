import type { Metadata } from 'next';
import { Inter, Chakra_Petch } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const chakraPetch = Chakra_Petch({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-chakra',
});

export const metadata: Metadata = {
  title: 'Bangboo Factory',
  description: 'Transform your photos into Bangboo characters using AI - inspired by Zenless Zone Zero',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${chakraPetch.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
