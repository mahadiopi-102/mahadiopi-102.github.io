export type Faq = { q: string; a: string };

/**
 * Changes from the vanilla build:
 * - Dropped "What services do you offer?" — it repeated the Services
 *   section immediately above it.
 * - Added capacity. This is what agency buyers actually screen for and the
 *   site never answered it.
 * - Added pricing, with no figure. Per video rather than per hour keeps it
 *   predictable at volume; the number comes after format and volume.
 */
export const FAQS: Faq[] = [
  {
    q: 'How many videos a month can you take on?',
    a: 'Depends on format and how much of it is talking-head versus multi-variant ad creative. Send your volume and format and I will tell you straight whether I can hold it — I would rather turn down a retainer than miss deliveries on one.',
  },
  {
    q: 'How do you charge?',
    a: 'Per video, not per hour, so the cost stays predictable as volume grows and you are never paying for my learning curve on your footage. Send format and monthly volume and you get a number back.',
  },
  {
    q: 'How fast do I get videos back?',
    a: 'Individual videos within 24 hours of receiving footage. Larger batches come back in rolling groups of 3 to 4 as they finish, so you are reviewing the first cuts while the rest are still being edited.',
  },
  {
    q: 'What do I need to send before we start?',
    a: 'Your raw footage or script, any brand guidelines you already have, and a couple of examples of edits you like. That is enough to start the first cut.',
  },
  {
    q: 'Do you offer revisions?',
    a: 'Yes. Revisions come back within 24 hours of your feedback, through Frame.io or whatever review platform you already use.',
  },
  {
    q: 'How do you handle multiple hook variants for ads?',
    a: 'Hook variants are built as duplicated sequences off one master timeline, so testing several hooks on the same ad is cheap instead of a full re-edit.',
  },
  {
    q: 'How do I get started?',
    a: 'Message me with what you publish and roughly how often. I will reply with whether I can hold that volume and when I can start.',
  },
];
