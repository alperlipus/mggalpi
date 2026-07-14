export interface ProjectItem {
  slug: string;
  year: number;
  location: string;
  gradient: string;
  metric: string;
  image?: string;
}

export const projects: ProjectItem[] = [
  {
    slug: 'incirlik-sosyal-yasam-merkezi',
    year: 2023,
    location: 'Adana, Türkiye',
    gradient: 'from-graphite-700 to-graphite-950',
    metric: 'Merkezi sistem uygulaması',
    image: '/projects/saha-1.jpg',
  },
  {
    slug: 'alasehir-egitim-tabur-komutanligi',
    year: 2022,
    location: 'Manisa, Türkiye',
    gradient: 'from-volt-600 to-graphite-900',
    metric: 'Merkezi sistem uygulaması',
    image: '/projects/saha-2.jpg',
  },
  {
    slug: 'kara-harp-okulu',
    year: 2021,
    location: 'Ankara, Türkiye',
    gradient: 'from-graphite-600 to-graphite-950',
    metric: 'Merkezi sistem uygulaması',
    image: '/projects/saha-3.jpg',
  },
  {
    slug: 'sweet-maril-resort',
    year: 2022,
    location: 'Aydın, Türkiye',
    gradient: 'from-volt-500 to-volt-800',
    metric: 'Otel',
    image: '/projects/saha-4.jpg',
  },
  {
    slug: 'misir-fuar-2022',
    year: 2022,
    location: 'Kahire, Mısır',
    gradient: 'from-mist-500 to-graphite-900',
    metric: 'İhracat / Fuar katılımı',
    image: '/projects/saha-5.jpg',
  },
];
