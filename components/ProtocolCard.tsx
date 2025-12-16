'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronUp, FileText, ExternalLink } from 'lucide-react';
import { Protocol } from '@/types/protocol';
import { formatDate, getProtocolTitle } from '@/lib/utils';
import ProtocolContentView from './SessionView';

interface ProtocolCardProps {
  filename: string;
  title: string;
  date: string;
  searchQuery?: string;
  autoExpand?: boolean;
}

export default function ProtocolCard({ filename, title, date, searchQuery = '', autoExpand = false }: ProtocolCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (autoExpand && !isExpanded) {
      setIsExpanded(true);
    }
  }, [autoExpand]);

  useEffect(() => {
    if (isExpanded && !protocol) {
      loadProtocol();
    }
  }, [isExpanded]);

  const loadProtocol = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/protocols?filename=${filename}`);
      const data = await response.json();
      setProtocol(data);
    } catch (error) {
      console.error('Error loading protocol:', error);
    } finally {
      setLoading(false);
    }
  };

  const transkribus_url = protocol?.meta?.transcribus_url;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{formatDate(date)}</span>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="h-6 w-6 text-gray-400" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-400" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50">
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Laadin protokolli...</p>
            </div>
          ) : protocol ? (
            <div className="p-6">
              {transkribus_url && (
                <div className="mb-4">
                  <a
                    href={transkribus_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Vaata Transkribus'es
                  </a>
                </div>
              )}
              
              <ProtocolContentView
                protocol={protocol}
                searchQuery={searchQuery}
              />
            </div>
          ) : (
            <div className="p-6 text-center text-gray-600">
              Protokolli ei õnnestunud laadida
            </div>
          )}
        </div>
      )}
    </div>
  );
}
