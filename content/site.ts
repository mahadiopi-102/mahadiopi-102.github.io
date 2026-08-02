/**
 * Every real-world value the site depends on, in one place.
 * Anything empty here is a launch blocker, not a placeholder to ship.
 */
export const SITE = {
  /** Absolute site URL. Needed for og:image to resolve — preview scrapers
   *  do not follow relative paths. BLOCKER: set once the domain is bought. */
  url: '',

  /** BLOCKER. While this is empty the contact form falls through to a
   *  mailto: link, which silently drops the visitor's email address and
   *  does nothing at all on a phone with no mail app configured. Someone
   *  fills the form, hits send, and never reaches Opi. */
  formspreeId: '',

  email: 'opihasan1814@gmail.com',
  instagram: 'https://www.instagram.com/opi.recut',
  instagramHandle: '@opi.recut',
  whatsapp: 'https://wa.me/qr/VTN6O4LNOCXTL1',
  /** Public, real, verifiable — the strongest trust signal on the site.
   *  Nothing on Proof or Testimonials is a claim visitors can't check here. */
  upwork: 'https://www.upwork.com/freelancers/~017aff93faacbb2dbe',

  /** A live claim. Turn off the day the queue fills. */
  availableForWork: true,
} as const;
