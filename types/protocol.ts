export interface Span {
  base_span: number[] | number[][]; // Võib olla [start, end] või [[start, end], ...]
  annotations?: any[];
}

export interface Layer {
  name: string;
  attributes: string[];
  spans: Span[];
  [key: string]: any;
}

export interface Meta {
  meeting_dates: string[];
  transcribus_url?: string;
}

export interface Protocol {
  text: string;
  meta: Meta;
  layers: Layer[];
  relation_layers: any[];
}

export interface ProtocolMetadata {
  filename: string;
  date: string;
  title: string;
}

export interface AgendaPoint {
  number: string;
  text: string;
  startPos: number;
  endPos: number;
}

