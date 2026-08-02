import { Inter, IBM_Plex_Mono } from 'next/font/google';

/**
 * The spec called for Clash Display + Satoshi from Fontshare via
 * next/font/local. Opi reviewed both side by side against Inter and chose
 * Inter, so this uses next/font/google — which also removes the need to
 * vendor woff2 files into the repo.
 *
 * Either way next/font self-hosts and preloads, so there are no external
 * DNS lookups on first paint (the vanilla build paid two).
 *
 * One family, weight-based hierarchy. --font-display is aliased to
 * --font-sans in globals.css rather than defined here, so swapping in a
 * real display face later is a one-line change and touches no component.
 */
export const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});
