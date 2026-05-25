import { SpeedInsights } from '@vercel/speed-insights/next';
import { JsonLd } from '@/components/JsonLd';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { FloatingToggle as DeveloperModeFloatingToggle } from '@/components/developer-mode/FloatingToggle';
import { Info as DeveloperModePopUpInfo } from '@/components/developer-mode/Info';
import { getDictionary, type LangCode } from '@/dictionaries';

import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from "next";

import "@/styles/globals.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: LangCode }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
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

const languages = {
  en: { htmlLang: 'en' },
  zh: { htmlLang: 'zh-CN' }, // 内部路由叫 zh, HTML 标记为 zh-CN
};

export async function generateStaticParams() {
  return ([{ lang: 'en' }, { lang: 'zh' }])
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const displayLang = languages[lang as LangCode].htmlLang;
  const dict = await getDictionary(lang);
  return (
    <html lang={displayLang}>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistSans.className} ${geistMono.variable} antialiased lg:w-5xl mx-auto`}
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
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
