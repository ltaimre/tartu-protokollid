import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tartu Linnavalitsuse Protokollid',
  description: 'Tartu linnavalitsuse ajaloolised istungite protokollid',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="et">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
