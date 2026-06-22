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
        className="flex w-full flex-col justify-center px-4 py-10 sm:py-14 lg:min-h-[calc(100svh_-_var(--spacing)*30)] lg:px-0 lg:py-8"
        aria-labelledby="hero-heading"
        dev-mode="tailwind"
      >
        <div className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14" dev-mode="tailwind">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left" dev-mode="tailwind">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-muted" dev-mode="tailwind">
              {dict.home.hero.subline}
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-5xl font-black uppercase leading-none tracking-[0.08em] text-primary sm:text-6xl lg:text-7xl"
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

          <div className="mx-auto w-full max-w-[min(92vw,27rem)]" dev-mode="tailwind">
            {/* <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-text-muted" dev-mode="tailwind">
              {dict.home.hero.proofPrompt}
            </p> */}
            <ProofBingo
              {...proofBingo}
              title={dict.home.hero.proofPrompt}
              projectCta={dict.home.hero.viewProjects}
              contactHref="/contact"
              projectsHref="/projects"
              // heading={(
              //   <>
              //     <p
              //       className="text-2xl font-black uppercase leading-none tracking-[0.12em] sm:text-3xl"
              //       dev-mode="tailwind"
              //     >
              //       {dict.home.hero.headline}
              //     </p>
              //     <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.26em] sm:text-[0.65rem]" dev-mode="tailwind">
              //       {dict.home.hero.subline}
              //     </p>
              //   </>
              // )}
            />
          </div>
        </div>
      </section>
    </>
  );
}
