import Link from '@/components/Link';
import { HomePageJsonLd } from '@/components/JsonLd';

import { CTAButton } from '@/components/CTAButton';
import { SayHi } from '@/components/SayHi';
import { DevModeToggle } from '@/components/developer-mode/Toggle';
import { SelectedProjectsList } from '@/components/SelectedProjectsList';
import { SkillSetList } from '@/components/SkillSetList';
import { getDictionary } from '@/dictionaries';
import { buildPageMetadata } from '@/lib/seo';

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
  return (
    <>
      <HomePageJsonLd lang={lang} dict={dict} />
      <section className="w-full mt-20 text-center" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-3xl md:text-5xl font-bold pb-1 mb-5 dark:text-primary" dev-mode="tailwind"><SayHi name={dict.home.hero.greeting} />.</h1>
        <p className="text-base md:text-lg text-text-muted px-5 lg:px-0" dev-mode="tailwind">{dict.home.hero.description.split(' ').map((word: string, i: number) => {
          if (i === 7) return <span key={i}>{word} <br /></span>
          return word + ' '
        })}</p>
        <DevModeToggle />
      </section>

      <section className="w-full mt-20" aria-labelledby="selected-projects-heading">
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
          <CTAButton href={`/${lang}/contact`}>{dict.home.sections.contact.button}</CTAButton>
        </div>
      </section>
    </>
  );
}
