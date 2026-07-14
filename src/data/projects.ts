export interface ProjectItem {
  slug: string;
  year: number;
  location: string;
  gradient: string;
  metric: string;
}

export const projects: ProjectItem[] = [
  {
    slug: 'incirlik-sosyal-yasam-merkezi',
    year: 2023,
    location: 'Adana, Türkiye',
    gradient: 'from-graphite-700 to-graphite-950',
    metric: 'Merkezi sistem uygulaması',
  },
  {
    slug: 'alasehir-egitim-tabur-komutanligi',
    year: 2022,
    location: 'Manisa, Türkiye',
    gradient: 'from-volt-600 to-graphite-900',
    metric: 'Merkezi sistem uygulaması',
  },
  {
    slug: 'kara-harp-okulu',
    year: 2021,
    location: 'Ankara, Türkiye',
    gradient: 'from-graphite-600 to-graphite-950',
    metric: 'Merkezi sistem uygulaması',
  },
  {
    slug: 'sweet-maril-resort',
    year: 2022,
    location: 'Aydın, Türkiye',
    gradient: 'from-volt-500 to-volt-800',
    metric: 'Otel',
  },
  {
    slug: 'misir-fuar-2022',
    year: 2022,
    location: 'Kahire, Mısır',
    gradient: 'from-mist-500 to-graphite-900',
    metric: 'İhracat / Fuar katılımı',
  },
];
