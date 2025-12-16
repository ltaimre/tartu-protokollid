import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Protocol, ProtocolMetadata } from '@/types/protocol';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  const dataDirectory = path.join(process.cwd(), 'data', 'protocols');

  try {
    if (filename) {
      // Tagasta üks konkreetne protokoll
      const filePath = path.join(dataDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const protocol: Protocol = JSON.parse(fileContents);
      return NextResponse.json(protocol);
    } else {
      // Tagasta kõik protokollid metadataga
      const filenames = await fs.readdir(dataDirectory);
      const jsonFiles = filenames.filter(name => name.endsWith('.json'));
      
      const protocols: ProtocolMetadata[] = await Promise.all(
        jsonFiles.map(async (filename) => {
          const filePath = path.join(dataDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const protocol: Protocol = JSON.parse(fileContents);
          
          // Võta kuupäev meta.meeting_dates'st
          const date = protocol.meta?.meeting_dates?.[0] || filename.replace('.json', '');
          
          // Võta pealkiri teksti esimesest reast
          const title = protocol.text.split('\n')[0] || 'Protokoll';
          
          return {
            filename,
            date,
            title
          };
        })
      );

      // Sorteeri kuupäeva järgi
      protocols.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return NextResponse.json(protocols);
    }
  } catch (error) {
    console.error('Error reading protocols:', error);
    return NextResponse.json({ error: 'Failed to load protocols' }, { status: 500 });
  }
}
