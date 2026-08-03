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

/**
 * Soft geo-gate for Bangladesh-based visitors (local competitors sizing up
 * the site). ?preview=1 sets a permanent localStorage bypass for Opi's own
 * access — that link never expires and works from any device. Everyone
 * else gets a one-time-per-session lookup against ipwho.is's free tier
 * (ipapi.co started returning a Cloudflare bot-challenge instead of JSON,
 * which silently failed every lookup open — ipwho.is has no such gate).
 * Fails open (page reveals) on API error/timeout so a real client is never
 * blocked by a flaky geo lookup — this is a deterrent, not a hard wall.
 */
const GEO_GATE = `
(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get('preview') === '1') {
      localStorage.setItem('opi-allow', '1');
    }
    if (localStorage.getItem('opi-allow') === '1') return;

    var cached = sessionStorage.getItem('opi-geo');
    if (cached === 'ok') return;
    if (cached === 'blocked') {
      window.location.replace('https://www.google.com');
      return;
    }

    document.documentElement.style.visibility = 'hidden';
    var reveal = function () {
      document.documentElement.style.visibility = 'visible';
    };
    var timer = setTimeout(reveal, 2500);

    fetch('https://ipwho.is/')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        clearTimeout(timer);
        if (d && d.success !== false && d.country_code === 'BD') {
          sessionStorage.setItem('opi-geo', 'blocked');
          window.location.replace('https://www.google.com');
        } else {
          sessionStorage.setItem('opi-geo', 'ok');
          reveal();
        }
      })
      .catch(function () {
        clearTimeout(timer);
        reveal();
      });
  } catch (e) {
    document.documentElement.style.visibility = 'visible';
  }
})();
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
        <script dangerouslySetInnerHTML={{ __html: GEO_GATE }} />
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
