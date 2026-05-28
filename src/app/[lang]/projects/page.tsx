import { ProjectsPageJsonLd } from '@/components/JsonLd';
import { ProjectGrid } from '@/components/ProjectGrid';
import { getDictionary } from '@/dictionaries';
import { buildPageMetadata } from '@/lib/seo';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return buildPageMetadata({
    lang,
    route: '/projects',
    title: dict.metadata.projects.title,
    description: dict.metadata.projects.description,
  });
}

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <>
      <ProjectsPageJsonLd lang={lang} dict={dict} />
      <section className="mt-10 lg:mt-20" aria-labelledby="projects-heading">
        <h1 id="projects-heading" className="pl-4 lg:pl-0 text-xl md:text-2xl font-bold md:text-center" dev-mode="tailwind">{dict.nav.projects}</h1>
        <ProjectGrid lang={lang} copy={dict.ui.projects} />
      </section>
    </>
  );
}
