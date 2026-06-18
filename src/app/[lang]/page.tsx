import Link from '@/components/Link';
import { HomePageJsonLd } from '@/components/JsonLd';

import { ProofBingo } from '@/components/ProofBingo';
import { SelectedProjectsList } from '@/components/SelectedProjectsList';
import { SkillSetList } from '@/components/SkillSetList';
import { getDictionary } from '@/dictionaries';
import { buildPageMetadata } from '@/lib/seo';
import { getProofBingo } from '@/services/proof-bingo';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return buildPageMetadata({
    lang,
    route: '/',
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
  });
}

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const proofBingo = getProofBingo(lang);

  return (
    <>
      <HomePageJsonLd lang={lang} dict={dict} />
      <section className="w-full mt-5 px-4 text-center md:mt-6" aria-labelledby="hero-heading" dev-mode="tailwind">
        <ProofBingo
          {...proofBingo}
          heading={(
            <>
              <h1
                id="hero-heading"
                className="text-3xl font-black uppercase leading-none tracking-[0.12em] sm:text-4xl"
                dev-mode="tailwind"
              >
                {dict.home.hero.headline}
              </h1>
              <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em] sm:text-[0.7rem]" dev-mode="tailwind">
                {dict.home.hero.subline}
              </p>
            </>
          )}
        />
      </section>

      <section className="w-full mt-5 md:mt-6" aria-labelledby="selected-projects-heading">
        <h2 id="selected-projects-heading" className="pl-4 lg:pl-0 text-xl md:text-2xl font-bold mb-5 md:text-center" dev-mode="tailwind"><Link href="/projects">{dict.home.sections.selectedProjects}</Link></h2>
        <SelectedProjectsList lang={lang} copy={dict.ui.projects} />
      </section>

      <section className="w-full mt-10 lg:mt-20" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="pl-4 lg:pl-0 text-xl md:text-2xl font-bold mb-5 md:text-center" dev-mode="tailwind">{dict.home.sections.skills}</h2>
        <SkillSetList lang={lang} />
      </section>

      <section
        className="w-full mt-10 lg:mt-20 px-4 lg:px-0"
        aria-labelledby="contact-heading"
        dev-mode="tailwind"
      >
        <div className="w-full max-w-md lg:max-w-none mx-auto py-10 px-4 lg:px-0 bg-surface text-center" dev-mode="tailwind">
          <h2 id="contact-heading" className="text-xl md:text-2xl font-bold mb-5" dev-mode="tailwind">{dict.home.sections.contact.title}</h2>
          <p className="text-base text-text-muted mb-8" dev-mode="tailwind">{dict.home.sections.contact.description}</p>
          <Link className="inline-block py-2 px-4
          border border-solid rounded-lg
          text-base border-primary text-primary hover:bg-primary/5 transition-colors" href="/contact" dev-mode="tailwind">{dict.home.sections.contact.button}</Link>
        </div>
      </section>
    </>
  );
}
