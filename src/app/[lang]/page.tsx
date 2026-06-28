import { HomePageJsonLd } from '@/components/JsonLd';
import { getDictionary } from '@/dictionaries';
import { buildPageMetadata } from '@/lib/seo';
import { ProofBingo } from '@/components/ProofBingo';
import { getProofBingo } from '@/services/proof-bingo';
import { CTAButton } from '@/components/CTAButton';

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
      {/* 36 = 16(NAV_HEIGHT_SPACING) + 20 (section margin-top) */}
      <section
        className="
          flex flex-wrap
          lg:min-h-[calc(100svh_-_var(--spacing)*36))]
          justify-center items-center lg:justify-between
          px-4 lg:px-0
          mt-10 lg:mt-20
        "
        aria-labelledby="hero-heading"
        dev-mode="tailwind"
      >
        <div
          className="lg:text-left max-w-100 lg:max-w-max"
          dev-mode="tailwind"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-muted" dev-mode="tailwind">
            {dict.home.hero.subline}
          </p>
          <h1
            id="hero-heading"
            className="
              mt-3
              font-black uppercase leading-none tracking-[0.06em] text-primary
              text-5xl lg:text-7xl
            "
            dev-mode="tailwind"
          >
            {dict.home.hero.headline}
          </h1>
          <p className="hidden md:block mt-5 max-w-[30rem] text-lg/7 text-text-muted" dev-mode="tailwind">
            {dict.home.hero.description}
          </p>
          <div className="mt-5" dev-mode="tailwind">
            <CTAButton href="/projects" variant="primary" className="mb-5 md:mr-5" fullWidthOnMobile>{dict.home.hero.viewProjects}</CTAButton>
            <CTAButton href="/contact" className="mb-5" fullWidthOnMobile>{dict.home.hero.hireMe}</CTAButton>
          </div>
        </div>

        <div dev-mode="tailwind">
          <ProofBingo {...proofBingo} />
        </div>
      </section>
    </>
  );
}
