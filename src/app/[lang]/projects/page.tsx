import { Suspense } from 'react';
import { connection } from 'next/server';
import { ProjectsPageJsonLd } from '@/components/JsonLd';
import { ProjectGrid } from '@/components/ProjectGrid';
import { ProjectGridSkeleton } from '@/components/ProjectGridSkeleton';
import { SkillSetList } from '@/components/SkillSetList';
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
  // 这里用 `connection()` 把 projects 页面切到请求时的 Partial Prerender 边界
  // 避免 `ProjectGrid` 内部的 `getAllProjects()` 在静态预渲染阶段阻塞页面。
  await connection();

  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <ProjectsPageJsonLd lang={lang} dict={dict} />
      <section className="mt-10 lg:mt-20" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="pl-4 lg:pl-0 text-xl md:text-2xl font-bold md:text-center" dev-mode="tailwind">
          {dict.nav.projects}
        </h2>
        <Suspense fallback={<ProjectGridSkeleton />}>
          <ProjectGrid lang={lang} copy={dict.ui.projects} />
        </Suspense>
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
