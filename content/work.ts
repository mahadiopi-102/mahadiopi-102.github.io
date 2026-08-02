/**
 * Every video is real and verified — aspect ratios were read from the
 * source files with yt-dlp, not guessed from titles.
 */

export type Lane = 'talking-head' | 'ads' | 'long' | 'brand';

export type WorkItem = {
  lane: Lane;
  title: string;
  /** Renamed from `client`, which held a timestamp. Someone would
   *  eventually have put a real client name in a field that renders as a
   *  duration. */
  duration: string;
  youtubeId: string;
  /**
   * Hand-picked frame in /public/posters/, e.g. '/posters/coaching.webp'.
   * TODO(Opi): export one frame per edit — 720x1280 vertical, 1280x720
   * horizontal, WebP q82. This is the one place on the site where image
   * quality is literally the product, and a frame you chose at 0:02 sells
   * the edit better than YouTube's automatic pick. Until then this falls
   * back to YouTube's thumbnail via posterFor() below.
   */
  poster?: string;
  /**
   * Marks the piece as one of the five shown in its lane. The weakest
   * item sets the perceived floor for a whole lane, so the lanes are
   * capped — but which ones is a judgement about Opi's own work that only
   * he can make. Order below is his: 2026-08-02 curation pass.
   */
  featured?: boolean;
};

export const LANES: { key: Lane; title: string; meta: string; vertical: boolean; blurb: string }[] = [
  {
    key: 'talking-head',
    title: 'Talking-head',
    meta: '9:16',
    vertical: true,
    blurb: 'Founders, coaches and finance. Pacing, captions and b-roll where it earns its place.',
  },
  {
    key: 'ads',
    title: 'UGC and ads',
    meta: '9:16',
    vertical: true,
    blurb: 'Meta and TikTok ad creative for brands that test hooks at volume.',
  },
  {
    key: 'long',
    title: 'YouTube long-form',
    meta: '16:9',
    vertical: false,
    blurb: 'Full episodes and explainers, same file discipline and caption QA.',
  },
];

export const WORK: WorkItem[] = [
  // ── talking-head — curated order, 2026-08-02. Finance excluded (not
  //    featured); "Coaching, long cut" moved to the long lane below. ──
  {
    lane: 'talking-head',
    title: 'Coaching',
    duration: '1:36',
    youtubeId: 'LVgZtlSvC4s',
    poster: '/posters/coaching.webp',
    featured: true,
  },
  {
    lane: 'talking-head',
    title: 'Gut health explainer',
    duration: '0:55',
    youtubeId: 'ezpy4LEl-zw',
    poster: '/posters/gut-health.webp',
    featured: true,
  },
  {
    lane: 'talking-head',
    title: 'Food brand',
    duration: '1:29',
    youtubeId: 'fCt41m_w8uA',
    poster: '/posters/food-brand.webp',
    featured: true,
  },
  {
    lane: 'talking-head',
    title: 'Mindset',
    duration: '1:08',
    youtubeId: 'qJvzpZ6k2fE',
    poster: '/posters/mindset.webp',
    featured: true,
  },
  {
    lane: 'talking-head',
    title: 'Educational',
    duration: '0:56',
    youtubeId: '8pYFpKpJY4g',
    poster: '/posters/educational.webp',
    featured: true,
  },
  {
    lane: 'talking-head',
    title: 'Finance',
    duration: '0:45',
    youtubeId: 'smiZM7Z__8Y',
    poster: '/posters/finance.webp',
  },

  // ── ads — curated order, 2026-08-02. Cap is 5: "Real estate" (0:55) and
  //    Fund manager are kept in the data but not featured, since Opi
  //    deprioritized/didn't place them.
  {
    lane: 'ads',
    title: 'Real estate, price hook',
    duration: '0:33',
    youtubeId: 'rYsXw9sMXfs',
    poster: '/posters/real-estate-price-hook.webp',
    featured: true,
  },
  {
    lane: 'ads',
    title: 'Car detailing',
    duration: '0:39',
    youtubeId: 'hO9CR94JfHs',
    poster: '/posters/car-detailing.webp',
    featured: true,
  },
  {
    lane: 'ads',
    title: 'Business launch',
    duration: '1:21',
    youtubeId: 'imlgE-__oCc',
    poster: '/posters/business-launch.webp',
    featured: true,
  },
  {
    lane: 'ads',
    title: 'Real estate reel',
    duration: '0:38',
    youtubeId: 'ymKlxUuHS6c',
    poster: '/posters/real-estate-reel.webp',
    featured: true,
  },
  {
    lane: 'ads',
    title: 'Healthcare',
    duration: '0:30',
    youtubeId: '6VEU-TdMjtQ',
    poster: '/posters/healthcare.webp',
    featured: true,
  },
  {
    lane: 'ads',
    title: 'Real estate',
    duration: '0:55',
    youtubeId: 'vLRl1aU9SFQ',
    poster: '/posters/real-estate.webp',
  },
  {
    lane: 'ads',
    title: 'Fund manager',
    duration: '0:25',
    youtubeId: 'e4zoLrocHBg',
    poster: '/posters/fund-manager.webp',
  },

  // ── brand film ──
  // Moved out of the ads lane: these are cinematic brand work, not UGC ad
  // creative, and mixing them diluted what that lane claims. Kept rather
  // than cut so the call stays Opi's.
  // TODO(Opi): show these as their own lane, or drop them.
  {
    lane: 'brand',
    title: 'Cinematic, house tour',
    duration: '0:24',
    youtubeId: 'xIR2d0By0uQ',
    poster: '/posters/cinematic-house-tour.webp',
  },
  {
    lane: 'brand',
    title: 'Cinematic, restaurant',
    duration: '0:17',
    youtubeId: 'N5BMRN55n6Y',
    poster: '/posters/cinematic-restaurant.webp',
  },

  // ── long-form — curated order, 2026-08-02. "Coaching, long cut" moved
  //    here from talking-head: it's a before/after format, closer to this
  //    lane's full-episode discipline than a short talking-head clip. Cap
  //    is 5, so "Brand sample" is kept in the data but not featured —
  //    Opi asked for the before/after piece explicitly, that wins.
  { lane: 'long', title: 'Solar sales coaching', duration: '1:02', youtubeId: 'eZfvqBmN7Jw', featured: true },
  { lane: 'long', title: 'AI agent explainer',   duration: '2:48', youtubeId: 'LV4mTN5xMOc', featured: true },
  { lane: 'long', title: 'SaaS',                 duration: '3:36', youtubeId: '33FlVSV5JhU', featured: true },
  {
    lane: 'long',
    title: 'Trading psychology',
    duration: '3:04',
    youtubeId: 'KFhaaTxc-m8',
    poster: '/posters/trading-psychology.webp',
    featured: true,
  },
  { lane: 'long', title: 'Brand sample',        duration: '3:00', youtubeId: 'CSukHfkBjJ4' },
  { lane: 'long', title: 'Coaching, long cut',  duration: '1:03', youtubeId: 'LyMZOKGvMcM', featured: true },
];

/**
 * Every item in a lane is shown — Opi's call: no cap, nothing hidden.
 * `featured` stays on the type in case that changes again, but it's not
 * applied here anymore.
 */
export function laneItems(lane: Lane): WorkItem[] {
  return WORK.filter((w) => w.lane === lane);
}

/**
 * YouTube poster fallback chain, used only until real frames exist.
 * maxresdefault is missing for most vertical uploads, and hqdefault — the
 * obvious fallback — is 480x360 with 4:3 letterbox bars baked in, which
 * looks broken stretched into a 9:16 frame. hq720 and mqdefault both keep
 * the true aspect ratio.
 */
export const YT_POSTER_CHAIN = ['maxresdefault', 'hq720', 'mqdefault'] as const;

export function posterFor(item: WorkItem, step = 0): string {
  if (item.poster && step === 0) return item.poster;
  const name = YT_POSTER_CHAIN[Math.min(step, YT_POSTER_CHAIN.length - 1)];
  return `https://i.ytimg.com/vi/${item.youtubeId}/${name}.jpg`;
}

/** Curated showreel order for the highlight carousel. */
export const REEL_CLIPS = [
  'LVgZtlSvC4s',
  'ymKlxUuHS6c',
  'e4zoLrocHBg',
  'hO9CR94JfHs',
  'qJvzpZ6k2fE',
] as const;
