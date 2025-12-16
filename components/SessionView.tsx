'use client';

import { Protocol } from '@/types/protocol';
import { getAgendaPoints } from '@/lib/utils';
import AgendaPointAccordion from './AgendaPointAccordion';
import ProtocolTextView from './SpeechAccordion';
import { ListOrdered } from 'lucide-react';

interface ProtocolContentViewProps {
  protocol: Protocol;
  searchQuery?: string;
}

export default function ProtocolContentView({ protocol, searchQuery = '' }: ProtocolContentViewProps) {
  const agendaPoints = getAgendaPoints(protocol);

  return (
    <div className="space-y-6">
      {/* Päevakorra punktid */}
      {agendaPoints.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <ListOrdered className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Päevakorra punktid
            </h3>
            <span className="text-sm text-gray-500 ml-auto">
              {agendaPoints.length} {agendaPoints.length === 1 ? 'punkt' : 'punkti'}
            </span>
          </div>
          
          <div className="space-y-3">
            {agendaPoints.map((point, index) => (
              <AgendaPointAccordion
                key={index}
                agendaPoint={point}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        </div>
      )}

      {/* Täistekst */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ProtocolTextView text={protocol.text} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
