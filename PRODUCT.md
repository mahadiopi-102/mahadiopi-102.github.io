# Product

## Register

brand

## Users
Prospective clients evaluating Mahadi Hasan Opi (short-form video editor) for hire — mainly agencies, coaches, real estate agents, and founders who publish talking-head/UGC/long-form content weekly. They arrive from an Upwork profile link, Instagram bio, or a WhatsApp/email share, on mobile as often as desktop, and are scanning fast to answer one question: is this person legitimate and good enough to trust with real client work. The job to be done is verification, not entertainment — they want proof (real numbers, real reviews, real edits) fast, then a low-friction way to start a conversation.

## Product Purpose
A single-page portfolio that replaces "trust my Upwork profile" with a owned, controllable surface: real work samples organized by format (talking-head, UGC/ads, long-form YouTube), a documented process, and unfalsifiable proof (linked Upwork profile, real hours/reviews/earnings) — built to convert a skim into a message sent. Success is a filled-out contact form or a direct WhatsApp/email/Instagram click from someone who was already qualifying Opi as a hire.

## Brand Personality
Restrained, proof-first, craft-led. Restrained: no gimmicks, no invented stats, minimal motion used with intent rather than decoration. Proof-first: every claim on the page traces to something verifiable (a real Upwork link, a real review, a real edit) — nothing is asserted that can't be checked. Craft-led: the site's own typography, motion, and detail work function as a demo reel for the editor's taste, since the person building the portfolio is themselves a craftsperson.

## Anti-references
Generic AI-agency template: purple/blue gradient glows as a default, the hero-metric-card cliché, identical icon+heading+text card grids repeated per section, tiny uppercase tracked eyebrows on every section, numbered 01/02/03 scaffolding used as decoration rather than because content is genuinely sequential. Also avoid corporate/enterprise SaaS coldness (this is a solo freelancer, not a company) and over-animated creative-agency sites where motion competes with the actual video work being shown.

## Design Principles
- Every number, testimonial, and claim must be real and traceable to a source (Upwork profile, real screenshots) — never invented or approximated for effect.
- Motion is restrained and purposeful: one shared token system (three durations, two eases), used to draw attention to real content (proof numbers, primary CTAs), never as ambient decoration layered on everything.
- The site is itself evidence of editing craft — typography, pacing, and detail quality should read as "made by someone who takes visual work seriously," not as a templated wrapper around a client list.
- Trust signals earn prominence over decoration: verified links (Upwork), real reviews, and the actual work samples outrank stylistic flourish in visual hierarchy.
- Content updates (new video samples, reordering work) should be cheap and low-risk to make — the site is a living portfolio, not a one-time build.

## Accessibility & Inclusion
WCAG AA contrast verified manually via relative-luminance calculation (not eyeballed) across both light and dark themes — ink ramp measured at 19.4/11.7/5.9/4.8:1 (light) and 15.9/12.0/7.9/5.1:1 (dark) against their respective surfaces. `prefers-reduced-motion` respected globally via Framer Motion's `MotionConfig reducedMotion="user"` plus explicit CSS overrides for custom animations (glow, shimmer, particles). No motion gates content visibility — reveals enhance already-present content rather than hiding it pre-animation.
