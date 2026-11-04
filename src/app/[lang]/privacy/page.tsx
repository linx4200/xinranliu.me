import Link from '@/components/Link';
import { CTAButton } from '@/components/CTAButton';
import { getDictionary } from '@/dictionaries';
import { buildPageMetadata } from '@/lib/seo';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return buildPageMetadata({
    lang,
    route: '/privacy',
    title: dict.metadata.privacy.title,
    description: dict.metadata.privacy.description,
  });
}

export default async function PrivacyPage({ params }: PageProps<'/[lang]/privacy'>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const privacy = dict.privacy;

  return (
    <article className="mx-auto max-w-5xl px-5 pt-10 pb-10 lg:px-0 lg:pt-20 lg:pb-0">
      <header>
        <h1 className="text-3xl font-bold leading-tight md:text-5xl">{privacy.title}</h1>
        <p className="mt-3 text-sm text-text-muted">
          {privacy.lastUpdatedLabel}{' '}
          <time dateTime="2026-11-04">{privacy.lastUpdated}</time>
        </p>
        <p className="mt-5 text-base leading-7 text-text-muted">{privacy.introduction}</p>
      </header>

      <div className="mt-10 space-y-10">
        <section aria-labelledby="privacy-information">
          <h2 id="privacy-information" className="text-xl font-bold md:text-2xl">{privacy.sections.information.title}</h2>
          <p className="mt-4 leading-7 text-text-muted">{privacy.sections.information.description}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-text-muted">
            {privacy.sections.information.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section aria-labelledby="privacy-purpose">
          <h2 id="privacy-purpose" className="text-xl font-bold md:text-2xl">{privacy.sections.purpose.title}</h2>
          <p className="mt-4 leading-7 text-text-muted">{privacy.sections.purpose.description}</p>
        </section>

        <section aria-labelledby="privacy-umami">
          <h2 id="privacy-umami" className="text-xl font-bold md:text-2xl">{privacy.sections.umami.title}</h2>
          <div className="mt-4 space-y-4 leading-7 text-text-muted">
            {privacy.sections.umami.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <a
            href="https://umami.is/privacy"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-block text-primary underline underline-offset-4"
          >
            {privacy.sections.umami.providerPolicy}
          </a>
        </section>

        <section aria-labelledby="privacy-speed-insights">
          <h2 id="privacy-speed-insights" className="text-xl font-bold md:text-2xl">{privacy.sections.speedInsights.title}</h2>
          <p className="mt-4 leading-7 text-text-muted">{privacy.sections.speedInsights.description}</p>
          <a
            href="https://vercel.com/legal/privacy-notice"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-block text-primary underline underline-offset-4"
          >
            {privacy.sections.speedInsights.providerPolicy}
          </a>
        </section>

        <section aria-labelledby="privacy-cookies">
          <h2 id="privacy-cookies" className="text-xl font-bold md:text-2xl">{privacy.sections.cookies.title}</h2>
          <p className="mt-4 leading-7 text-text-muted">{privacy.sections.cookies.description}</p>
        </section>

        <section aria-labelledby="privacy-retention">
          <h2 id="privacy-retention" className="text-xl font-bold md:text-2xl">{privacy.sections.retention.title}</h2>
          <div className="mt-4 space-y-4 leading-7 text-text-muted">
            {privacy.sections.retention.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section aria-labelledby="privacy-rights">
          <h2 id="privacy-rights" className="text-xl font-bold md:text-2xl">{privacy.sections.rights.title}</h2>
          <p className="mt-4 leading-7 text-text-muted">
            {privacy.sections.rights.beforeLink}{' '}
            <Link href="/contact" className="text-primary underline underline-offset-4">
              {privacy.sections.rights.contactLink}
            </Link>
            {privacy.sections.rights.afterLink}
          </p>
          <p className="mt-4 leading-7 text-text-muted">{privacy.sections.rights.limitation}</p>
        </section>

        <section aria-labelledby="privacy-changes">
          <h2 id="privacy-changes" className="text-xl font-bold md:text-2xl">{privacy.sections.changes.title}</h2>
          <p className="mt-4 leading-7 text-text-muted">{privacy.sections.changes.description}</p>
        </section>

        <div>
          <CTAButton href="/" fullWidthOnMobile>{privacy.backHome}</CTAButton>
        </div>
      </div>
    </article>
  );
}
