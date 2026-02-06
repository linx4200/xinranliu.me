
export const JsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Xinran Liu',
    url: 'https://xinranliu.me',
    jobTitle: 'Independent Frontend Engineer',
    sameAs: [
      'https://github.com/linx4200',
      'https://www.linkedin.com/in/xinran-liu-502897318'
    ],
    knowsAbout: ['React', 'Vue', 'Next.js', 'Web Development', 'Tailwind CSS'],
  };


  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
