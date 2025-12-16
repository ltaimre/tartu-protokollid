import { Protocol, AgendaPoint, Layer, Span } from '@/types/protocol';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('et-EE', options);
}

export function getPreview(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function extractTextFromSpan(fullText: string, span: Span): string {
  if (!span.base_span || span.base_span.length === 0) return '';
  
  // base_span võib olla kas [start, end] või [[start, end], [start, end], ...]
  // Kontrollime esimest elementi
  const firstElement = span.base_span[0];
  
  if (Array.isArray(firstElement)) {
    // Massiiv massiividest
    let result = '';
    for (const [start, end] of span.base_span as number[][]) {
      result += fullText.substring(start, end);
    }
    return result;
  } else {
    // Lihtne [start, end]
    const [start, end] = span.base_span as [number, number];
    return fullText.substring(start, end);
  }
}

export function getAgendaPoints(protocol: Protocol): AgendaPoint[] {
  const agendaLayer = protocol.layers.find(layer => layer.name === 'agenda_points');
  if (!agendaLayer || !agendaLayer.spans) return [];
  
  return agendaLayer.spans.map((span, index) => {
    const text = extractTextFromSpan(protocol.text, span);
    const number = span.annotations?.[0]?.number || (index + 1).toString();
    
    // base_span võib olla kas [start, end] või [[start, end], ...]
    let startPos = 0;
    let endPos = 0;
    
    if (Array.isArray(span.base_span[0])) {
      // Massiiv massiividest
      const spans = span.base_span as number[][];
      startPos = spans[0]?.[0] || 0;
      endPos = spans[spans.length - 1]?.[1] || 0;
    } else {
      // Lihtne [start, end]
      const [start, end] = span.base_span as [number, number];
      startPos = start;
      endPos = end;
    }
    
    return {
      number,
      text,
      startPos,
      endPos
    };
  });
}

export function getSentences(protocol: Protocol): string[] {
  const sentenceLayer = protocol.layers.find(layer => layer.name === 'sentences');
  if (!sentenceLayer || !sentenceLayer.spans) return [];
  
  return sentenceLayer.spans.map(span => extractTextFromSpan(protocol.text, span));
}

export function searchInProtocol(protocol: Protocol, query: string): boolean {
  const lowerQuery = query.toLowerCase();
  return protocol.text.toLowerCase().includes(lowerQuery);
}

export function highlightText(text: string, query: string): string {
  if (!query) return text;
  
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getProtocolTitle(protocol: Protocol): string {
  // Võta esimene rida tekstist pealkirjaks
  const firstLine = protocol.text.split('\n')[0];
  return firstLine || 'Protokoll';
}
