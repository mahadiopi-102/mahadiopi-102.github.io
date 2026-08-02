import type { Metadata } from 'next';
import { MotionConfig } from 'motion/react';
import { sans, mono } from './fonts';
import { SITE } from '@/content/site';
import { Scrubber } from '@/components/Scrubber';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { VideoLightboxProvider } from '@/components/VideoLightbox';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mahadi Hasan Opi, short-form video editor',
  description:
    'Talking-head Reels, UGC ad creative and podcast repurposing. Individual videos back in 48 hours.',
  metadataBase: SITE.url ? new URL(SITE.url) : undefined,
  openGraph: {
    title: 'Mahadi Hasan Opi, short-form video editor',
    description:
      'Talking-head Reels, UGC ad creative, podcast cuts. Back in 48 hours.',
    images: ['/og.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahadi Hasan Opi, short-form video editor',
    description:
      'Talking-head Reels, UGC ad creative, podcast cuts. Back in 48 hours.',
    images: ['/og.jpg'],
  },
};

/**
 * Applies the stored theme before first paint. Without this the page ships
 * dark (the default class below), then flips to light after hydration for
 * anyone who chose light — a visible flash on every single load.
 * Deliberately inline and tiny; it must run before the body paints.
 */
const NO_FLASH = `
try {
  var t = localStorage.getItem('opi-theme');
  if (t === 'light') document.documentElement.classList.remove('dark');
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // dark by default; the toggle removes this class for light
      className={`dark ${sans.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* reducedMotion="user" replaces every manual prefers-reduced-motion
            check: transforms are dropped for those users, opacity still
            fades, which is the correct behaviour. */}
        <MotionConfig reducedMotion="user">
          <VideoLightboxProvider>
            <Scrubber />
            <Nav />
            <div className="flex-1">{children}</div>
            <Footer />
          </VideoLightboxProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
