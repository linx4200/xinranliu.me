import { ProjectsPageJsonLd } from '@/components/JsonLd';
import { ProjectGrid } from '@/components/ProjectGrid';
import { SkillSetList } from '@/components/SkillSetList';
import { getDictionary } from '@/dictionaries';
import { buildPageMetadata } from '@/lib/seo';
import { getAllProjects } from '@/services/projects';

import type { Metadata } from 'next';

export const revalidate = 3600;

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
  const projects = await getAllProjects(lang);

  return (
    <>
      <ProjectsPageJsonLd lang={lang} dict={dict} projects={projects} />
      <section className="mt-10 lg:mt-20" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="pl-4 lg:pl-0 text-xl md:text-2xl font-bold md:text-center" dev-mode="tailwind">
          {dict.nav.projects}
        </h2>
        <ProjectGrid projects={projects} copy={dict.ui.projects} />
      </section>
      <section className="mt-10 lg:mt-20" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="pl-4 lg:pl-0 text-xl md:text-2xl font-bold md:text-center" dev-mode="tailwind">
          {dict.home.sections.skills}
        </h2>
        <SkillSetList lang={lang} />
      </section>
    </>
  );
}
