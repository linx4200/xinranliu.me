import { SpeedInsights } from '@vercel/speed-insights/next';
import { notFound } from 'next/navigation';

import { SiteJsonLd } from '@/components/JsonLd';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { FloatingToggle as DeveloperModeFloatingToggle } from '@/components/developer-mode/FloatingToggle';
import { Info as DeveloperModePopUpInfo } from '@/components/developer-mode/Info';

import { supportedLanguages, hasLocale, getDictionary, getHtmlLang } from '@/dictionaries';
import { siteMetadataBase } from '@/lib/seo';

import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from "next";

import "@/styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: siteMetadataBase,
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return supportedLanguages.map(lang => ({ lang} ));
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return notFound();
  }

  const displayLang = getHtmlLang(lang);
  const dict = await getDictionary(lang);

  return (
    <html lang={displayLang}>
      <head>
        <SiteJsonLd dict={dict} />
      </head>
      <body
        className={`${geistSans.variable} ${geistSans.className} ${geistMono.variable} antialiased lg:w-5xl mx-auto`}
      >
        <a href="#main-content" className="skip-link">{dict.ui.skipToMainContent}</a>
        <Nav dict={dict} />
        {/* The height of nav and footer is 15*spacing */}
        <main id="main-content" className="w-full min-h-[calc(100vh_-_var(--spacing)*30)]" role="main">
          {children}
        </main>

        <Footer />

        <DeveloperModeFloatingToggle />
        <DeveloperModePopUpInfo />

        <SpeedInsights />
      </body>
    </html>
  );
}
