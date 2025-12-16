import ProtocolList from '@/components/ProtocolList';
import { BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <BookOpen className="h-12 w-12" />
            <div>
              <h1 className="text-4xl font-bold">
                Tartu Linnavalitsuse Protokollid
              </h1>
              <p className="text-blue-100 mt-2 text-lg">
                Ajaloolised istungite protokollid aastast 1918
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProtocolList />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm">
              Tartu Linnavalitsuse protokollid • Digitaalne arhiiv
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © {new Date().getFullYear()} • Kõik õigused kaitstud
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
