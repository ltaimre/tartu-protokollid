# Tartu Linnavalitsuse Protokollid

Interaktiivne veebirakendus Tartu linnavalitsuse ajalooliste istungite protokollide kuvamiseks ja sirvimiseks.

## Omadused

- 📚 **Dünaamiline protokollide laadimine** - Kõik JSON failid data/protocols kaustast laetakse automaatselt
- 🔍 **Tekstiotsing** - Otsi protokollidest, kõnelejate nimede või sisu järgi
- 👥 **Kõnelejate filter** - Filtreeri kõnesid konkreetse kõneleja järgi
- 📖 **Laiendatavad vaated** - Istungid ja kõned on vaikimisi kokku pandud, klõpsuga avatavad
- 🎨 **Kaasaegne disain** - Tailwind CSS-il põhinev responsive disain
- ⚡ **Kiire ja efektiivne** - Next.js 14 App Router ja Server Components

## Tehnoloogiad

- **Next.js 14** - React framework
- **TypeScript** - Tüübikindlus
- **Tailwind CSS** - Styling
- **Lucide React** - Ikoonid

## Alustamine

### 1. Installi sõltuvused

```bash
npm install
```

### 2. Käivita arendusserver

```bash
npm run dev
```

Ava brauser aadressil [http://localhost:3000](http://localhost:3000)

### 3. Ehita produktsiooni jaoks

```bash
npm run build
npm start
```

## Projekti struktuur

```
tartu-protokollid/
├── app/                      # Next.js App Router
│   ├── api/protocols/        # API endpoint protokollide laadimiseks
│   ├── layout.tsx            # Põhilayout
│   ├── page.tsx              # Avaleht
│   └── globals.css           # Globaalsed stiilid
├── components/               # React komponendid
│   ├── ProtocolList.tsx      # Protokollide loetelu
│   ├── ProtocolCard.tsx      # Üksiku protokolli kaart
│   ├── SessionView.tsx       # Istungi vaade
│   ├── SpeechAccordion.tsx   # Kõne accordion
│   ├── SearchBar.tsx         # Otsingu sisestusväli
│   └── SpeakerFilter.tsx     # Kõnelejate filter
├── data/protocols/           # JSON protokollid
├── lib/utils.ts              # Abifunktsioonid
├── types/protocol.ts         # TypeScript tüübid
└── package.json              # Projekt config
```

## Uute protokollide lisamine

1. Lisa uus JSON fail kausta `data/protocols/`
2. Fail peab vastama järgmisele struktuurile:

```json
{
  "title": "Protokolli pealkiri",
  "date": "YYYY-MM-DD",
  "sessions": [
    {
      "session_number": 1,
      "speeches": [
        {
          "speaker": "Kõneleja nimi",
          "text": "Kõne tekst..."
        }
      ]
    }
  ]
}
```

3. Rakendus laeb faili automaatselt järgmisel käivitamisel

## Litsents

See projekt on loodud hariduslikel ja arhiivieesmärkidel.
# tartu-protokollid
