'use client';

import { useState, useEffect } from 'react';
import { ProtocolMetadata, Protocol } from '@/types/protocol';
import ProtocolCard from './ProtocolCard';
import SearchBar from './SearchBar';

export default function ProtocolList() {
  const [protocols, setProtocols] = useState<ProtocolMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [fullProtocols, setFullProtocols] = useState<Map<string, Protocol>>(new Map());

  useEffect(() => {
    loadProtocols();
  }, []);

  // Lae kõik protokollid sisuotsingut jaoks
  useEffect(() => {
    if (searchQuery.length >= 3) {
      searchInContent();
    }
  }, [searchQuery]);

  const loadProtocols = async () => {
    try {
      const response = await fetch('/api/protocols');
      const data = await response.json();
      setProtocols(data);
    } catch (error) {
      console.error('Error loading protocols:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchInContent = async () => {
    if (searchQuery.length < 3) return;
    
    setSearching(true);
    const newFullProtocols = new Map<string, Protocol>();
    
    try {
      // Lae kõik protokollid paralleelselt
      const promises = protocols.map(async (protocol) => {
        const response = await fetch(`/api/protocols?filename=${protocol.filename}`);
        const data: Protocol = await response.json();
        return { filename: protocol.filename, data };
      });
      
      const results = await Promise.all(promises);
      results.forEach(({ filename, data }) => {
        newFullProtocols.set(filename, data);
      });
      
      setFullProtocols(newFullProtocols);
    } catch (error) {
      console.error('Error searching protocols:', error);
    } finally {
      setSearching(false);
    }
  };

  const filteredProtocols = protocols.filter(protocol => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    // Otsi pealkirjast ja kuupäevast
    if (protocol.title.toLowerCase().includes(query) || protocol.date.includes(query)) {
      return true;
    }
    
    // Kui otsingu pikkus on vähemalt 3 tähte, otsi sisust
    if (searchQuery.length >= 3 && fullProtocols.has(protocol.filename)) {
      const fullProtocol = fullProtocols.get(protocol.filename);
      return fullProtocol?.text.toLowerCase().includes(query);
    }
    
    return false;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Laadin protokolle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-2">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        {searching && (
          <p className="text-sm text-gray-500">
            Otsin protokollide sisust...
          </p>
        )}
        {searchQuery.length > 0 && searchQuery.length < 3 && (
          <p className="text-sm text-gray-500">
            Sisestage vähemalt 3 tähte sisuotsingut jaoks
          </p>
        )}
      </div>

      {filteredProtocols.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {searchQuery ? 'Otsingule vastavaid protokolle ei leitud' : 'Protokolle ei ole saadaval'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Leitud {filteredProtocols.length} {filteredProtocols.length === 1 ? 'protokoll' : 'protokolli'}
          </p>
          
          {filteredProtocols.map((protocol) => (
            <ProtocolCard
              key={protocol.filename}
              filename={protocol.filename}
              title={protocol.title}
              date={protocol.date}
              searchQuery={searchQuery}
              autoExpand={searchQuery.length >= 3 && fullProtocols.has(protocol.filename)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
