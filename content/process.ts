/**
 * The six process steps. This is the section that wins the job — in the
 * vanilla build it sat behind an auto-rotating carousel, which meant most
 * visitors read two of them. It becomes a sticky two-column scroll so all
 * six titles are visible at once. The point is not that a visitor reads
 * all six; it is that a scanner sees there ARE six.
 *
 * `visual` names the diagram each panel renders. The CSS diagrams from the
 * vanilla build (checklist, file tree, hook branches, aspect frames,
 * timestamped comment, AI used/skipped table) are honest and specific and
 * port as-is — they beat stock illustration and they beat a fake product
 * screenshot.
 */

export type ProcessVisual =
  | 'checklist'
  | 'file-tree'
  | 'branches'
  | 'frames'
  | 'comment'
  | 'ai-table';

export type ProcessStep = {
  title: string;
  /** Paragraphs. Kept as an array rather than an HTML string so the panel
   *  renders real elements instead of dangerouslySetInnerHTML. */
  body: string[];
  visual: ProcessVisual;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: 'Caption QA, three passes',
    body: [
      'Line by line against the script. Spellcheck. Then a full watch with fresh eyes after export.',
      'A typo in an ad caption is a re-upload and a reset on the learning phase. Zero typos is a process, not a promise.',
    ],
    visual: 'checklist',
  },
  {
    title: 'File handling',
    body: [
      'Naming runs Client_VideoID_Version. Drafts and finals live in separate folders. You never have to guess which cut is current.',
    ],
    visual: 'file-tree',
  },
  {
    title: 'Hook variants',
    body: [
      'Built as duplicated sequences off one master timeline. That is what makes testing several hooks on the same ad cheap instead of expensive.',
    ],
    visual: 'branches',
  },
  {
    title: 'Aspect ratios',
    body: [
      '9:16, 1:1 and 4:5 built from one project with safe zones set, so nothing important sits under the platform UI.',
    ],
    visual: 'frames',
  },
  {
    title: 'Review flow',
    body: ['Frame.io, or your own platform. Timestamped comments, revise, redeliver.'],
    visual: 'comment',
  },
  {
    title: 'AI tools, with judgement',
    body: [
      'Used where they earn their place: caption generation, cleanup, upscaling, and generated b-roll when you have no footage of your own.',
      'Generated footage covers atmosphere and establishing shots only. Never anything standing in for your real premises, staff or results.',
    ],
    visual: 'ai-table',
  },
];

/**
 * Turnaround stats.
 * DECIDE BEFORE LAUNCH: publishing 48h and 24h makes them permanent public
 * commitments to every visitor, and removes the option of quietly offering
 * 72h to a client who would have accepted it.
 */
export const TURNAROUND = [
  { value: '48h', label: 'Individual videos back within 48 hours of receiving footage.' },
  { value: '24h', label: 'Revisions returned within 24 hours of your feedback.' },
  { value: '3-4', label: 'Batches delivered in rolling groups as they finish, not all at the end.' },
] as const;

export const OPINION = {
  text: "Editing doesn't make a video good, it just stops a good video from losing people. Everything I do is in service of that, not on top of it.",
  attribution: 'MAHADI OPI',
};
