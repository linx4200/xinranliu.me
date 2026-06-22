import Link from '@/components/Link';
import { HomePageJsonLd } from '@/components/JsonLd';
import { ProofBingo } from '@/components/ProofBingo';
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
      <section
        className="
          lg:min-h-[calc(100svh_-_var(--spacing)*30)]
          lg:flex w-full
          justify-center items-center gap-14
          px-4 py-10
          sm:py-14 lg:px-0 lg:py-8
        "
        aria-labelledby="hero-heading"
        dev-mode="tailwind"
      >
        <div className="flex-[1.05] text-center mb-8 lg:m-0 lg:text-left" dev-mode="tailwind">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-muted" dev-mode="tailwind">
            {dict.home.hero.subline}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 whitespace-nowrap text-[clamp(2.75rem,12vw,4rem)] font-black uppercase leading-none tracking-[0.06em] text-primary sm:text-6xl lg:text-[4.25rem]"
            dev-mode="tailwind"
          >
            {dict.home.hero.headline}
          </h1>
          <p className="mt-6 text-base leading-7 text-text-muted sm:text-lg" dev-mode="tailwind">
            {dict.home.hero.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start" dev-mode="tailwind">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-primary bg-primary px-5 text-sm font-semibold text-bg transition-colors hover:bg-primary/85"
              href="/projects"
              dev-mode="tailwind"
            >
              {dict.home.hero.viewProjects}
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              href="/contact"
              dev-mode="tailwind"
            >
              {dict.home.hero.hireMe}
            </Link>
          </div>
        </div>

        <div className="flex-[.95]" dev-mode="tailwind">
          <ProofBingo {...proofBingo} />
        </div>
      </section>
    </>
  );
}
