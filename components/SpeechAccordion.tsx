'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface ProtocolTextViewProps {
  text: string;
  searchQuery?: string;
}

export default function ProtocolTextView({ text, searchQuery = '' }: ProtocolTextViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const highlightText = (content: string) => {
    if (!searchQuery) return content;
    
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = content.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const preview = text.substring(0, 500) + '...';

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-gray-900">Protokolli täistekst</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      <div className="px-4 py-4 bg-white">
        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap font-mono text-xs">
          {isExpanded ? highlightText(text) : highlightText(preview)}
        </div>
        {!isExpanded && text.length > 500 && (
          <button
            onClick={() => setIsExpanded(true)}
            className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Näita kogu teksti →
          </button>
        )}
      </div>
    </div>
  );
}
