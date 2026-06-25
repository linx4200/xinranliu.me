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
          flex min-h-[calc(100svh_-_4rem)] w-full flex-col
          justify-start gap-4
          px-4 py-4
          sm:gap-6 sm:py-6
          md:grid md:min-h-[calc(100svh_-_var(--spacing)*30)]
          md:grid-cols-[minmax(0,0.86fr)_minmax(20rem,1fr)]
          md:items-center md:gap-8 md:py-10
          lg:grid-cols-2 lg:justify-center lg:gap-14 lg:px-0 lg:py-8
        "
        aria-labelledby="hero-heading"
        dev-mode="tailwind"
      >
        <div
          className="
            flex flex-col items-center text-center
            md:min-w-0 md:items-start md:text-left
          "
          dev-mode="tailwind"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-muted" dev-mode="tailwind">
            {dict.home.hero.subline}
          </p>
          <h1
            id="hero-heading"
            className="
              mt-3 whitespace-nowrap
              text-[clamp(2.25rem,10.5vw,3.2rem)] font-black uppercase leading-none tracking-[0.06em] text-primary
              sm:text-6xl
              md:text-[clamp(3rem,7vw,4rem)]
              lg:text-[4.25rem]
            "
            dev-mode="tailwind"
          >
            {dict.home.hero.headline}
          </h1>
          <p className="mt-5 hidden max-w-[30rem] text-base leading-7 text-text-muted md:block md:text-lg" dev-mode="tailwind">
            {dict.home.hero.description}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 md:mt-8 md:justify-start" dev-mode="tailwind">
            <Link
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-primary bg-primary px-4 text-sm font-semibold text-bg transition-colors hover:bg-primary/85 md:min-h-11 md:px-5"
              href="/projects"
              dev-mode="tailwind"
            >
              {dict.home.hero.viewProjects}
            </Link>
            <Link
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 md:min-h-11 md:px-5"
              href="/contact"
              dev-mode="tailwind"
            >
              {dict.home.hero.hireMe}
            </Link>
          </div>
        </div>

        <div className="w-full md:min-w-0" dev-mode="tailwind">
          <ProofBingo {...proofBingo} />
        </div>
      </section>
    </>
  );
}
