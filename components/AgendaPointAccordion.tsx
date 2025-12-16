'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { AgendaPoint } from '@/types/protocol';

interface AgendaPointAccordionProps {
  agendaPoint: AgendaPoint;
  searchQuery?: string;
}

export default function AgendaPointAccordion({ agendaPoint, searchQuery = '' }: AgendaPointAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  
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

  const preview = agendaPoint.text.length > 200 
    ? agendaPoint.text.substring(0, 200) + '...' 
    : agendaPoint.text;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-start justify-between gap-3"
      >
        <div className="flex items-start gap-3 text-left flex-1">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
            {agendaPoint.number}
          </div>
          <div className="flex-1 min-w-0">
            {!isOpen && (
              <div className="text-sm text-gray-700 whitespace-pre-wrap">
                {highlightText(preview)}
              </div>
            )}
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 py-4 bg-white">
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
            {highlightText(agendaPoint.text)}
          </div>
        </div>
      )}
    </div>
  );
}
