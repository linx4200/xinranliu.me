
import { projects } from '@/data/projects';

export const JsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    "dateCreated": "2024-12-23T12:34:00-05:00 // todo",
    "dateModified": "2024-12-26T14:53:00-05:00 // todo",
    "mainEntity": {
      "@id": "#me",
      "@type": "Person",
      name: 'Xinran Liu',
      jobTitle: 'Independent Frontend Engineer',
      knowsAbout: ['React', 'Vue', 'Next.js', 'Web Development', 'Tailwind CSS'],
    },
    hasPart: projects.map((project) => ({
      '@type': 'CreativeWork', // https://schema.org/CreativeWork
      name: project.title.en,
      description: project.desc.en,
      url: project.site ?? project.github ?? 'https://xinranliu.me/projects',
      keywords: project.tags?.join(',') ?? '',
      author: { '@id': '#me' }
    })),
    url: 'https://xinranliu.me',
    sameAs: [
      'https://github.com/linx4200',
      'https://www.linkedin.com/in/xinran-liu-502897318'
    ],
  };


  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
