/**
 * Real Upwork reviews, transcribed verbatim from the "Completed
 * successfully" cards on Opi's contract history.
 *
 * Why text and not the screenshots: the screenshots are 688x350 with a lot
 * of internal empty space, and at ~340px on a phone — where most of this
 * traffic lands — the review text is unreadable. The screenshot stays
 * available as proof via `screenshot`, behind a verify link, so nothing
 * about authenticity is lost.
 *
 * "Upwork Client" is Upwork's own label, not a placeholder — the platform
 * withholds client identity on public reviews by default.
 *
 * Two of the five completions carry a 5-star rating and a job title but no
 * written comment. They are kept with `comment: null` rather than dropped
 * or padded with invented words.
 */

export type Testimonial = {
  /** Verbatim. Null when the client left a rating but no written review. */
  comment: string | null;
  /** The Upwork job title the review is attached to. */
  job: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Original review card, for a "verify on Upwork" affordance. */
  screenshot: string;
  /** True where Upwork itself truncated the review text with an ellipsis.
   *  TODO(Opi): paste the full text from your Upwork profile. */
  truncated?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    comment:
      'Mahadi did a great job and will definitely recommend him to others. He followed instructions, was communicative, and met project deadlines.',
    job: 'Short-form video editing',
    author: 'Upwork Client',
    rating: 5,
    screenshot: '/testimonials/upwork-3.jpg',
  },
  {
    comment:
      'Mahadi is a great editor. He did everything as I asked, was super fast, and the final result was awesome. I would definitely recommend!',
    job: 'Short-form video editing',
    author: 'Upwork Client',
    rating: 5,
    screenshot: '/testimonials/upwork-4.jpg',
  },
  {
    comment:
      'Awesome working with Mahadi! He delivered for us, responded super quickly to communications, was open to different strategies. He helped us grow organically,',
    job: 'Short-form video editing',
    author: 'Upwork Client',
    rating: 5,
    screenshot: '/testimonials/upwork-5.jpg',
    truncated: true,
  },
  {
    comment: null,
    job: 'Short video and reels editor',
    author: 'Upwork Client',
    rating: 5,
    screenshot: '/testimonials/upwork-1.jpg',
  },
  {
    comment: null,
    job: '28 short form, 8 long form viral videos',
    author: 'Upwork Client',
    rating: 5,
    screenshot: '/testimonials/upwork-2.jpg',
  },
];

/** Only the ones with real written text are quotable as cards. */
export const QUOTABLE = TESTIMONIALS.filter(
  (t): t is Testimonial & { comment: string } => t.comment !== null,
);
