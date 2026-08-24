'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { MailIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { DUR, EASE_OUT, revealLeft, revealRight, ONCE } from '@/lib/motion';
import { SITE } from '@/content/site';
import { WhatsAppIcon, InstagramIcon } from '@/components/BrandIcons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Compact channel pill. The reference CTA carries no contact cards at all —
 * just the headline and the portrait — so the three full-width rows that
 * used to sit here were what made this column feel cluttered next to it.
 * These collapse to icon + label; the address itself still lives in the
 * footer, so nothing verifiable is lost.
 */
function ChannelPill({
  icon,
  label,
  href,
}: {
  icon: ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg-2/60 px-3.5 py-2 text-small text-ink-2 transition-colors duration-fast hover:border-amber/50 hover:text-ink active:scale-95"
    >
      <span className="text-ink-3 transition-colors duration-fast group-hover:text-amber">
        {icon}
      </span>
      {label}
    </a>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!SITE.formspreeId) {
      const data = new FormData(form);
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        `Project from ${data.get('name')}`,
      )}&body=${encodeURIComponent(String(data.get('message') ?? ''))}`;
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  /* Shared field styling. Taller and rounder than the previous inputs, with
     label sizing lifted toward heading scale — in the reference the field
     labels read almost as large as body copy, which is what stops the card
     feeling like a dense form. */
  const field =
    'w-full rounded-lg border border-line bg-bg-2/70 px-4 py-3 text-body text-ink outline-none transition-[border-color,box-shadow] duration-fast focus:border-amber focus:shadow-[0_0_16px_var(--amber-glow-2-hover)]';
  const label = 'text-lead font-medium text-ink';

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-[1160px] overflow-hidden border-t border-line px-6 pt-24 pb-24 md:pb-0"
    >
      {/* Ambient wash pushed to the left, behind the portrait. The reference
          turns its whole CTA background blue here; this stays amber, since a
          per-section colour flip is the one thing the project's theme lock
          rules out. */}
      <span
        aria-hidden
        className="section-ambient"
        style={{ '--ambient-x': '22%', '--ambient-y': '68%' } as React.CSSProperties}
      />

      <div className="relative z-10 grid gap-12 md:grid-cols-[1fr_1fr] md:items-center md:gap-10">
        {/* Left: headline over the portrait, as in the reference. */}
        <div className="relative flex flex-col">
          <Reveal>
            {/* Accent-coloured, unlike every other section heading on the
                site. The reference does the same on its final CTA, and this
                is the one section whose job is to be acted on. */}
            <h2 className="max-w-[11ch] text-[clamp(2.8rem,6vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.03em] text-amber">
              Tell me what you publish.
            </h2>
            <p className="mt-5 max-w-[42ch] text-lead text-ink-2">
              You talk to me directly. No handoffs, no account managers.
            </p>
          </Reveal>

          <motion.div
            variants={revealLeft}
            initial="hidden"
            whileInView="visible"
            viewport={ONCE}
            className="mt-7 flex flex-wrap items-center gap-2.5"
          >
            <ChannelPill
              icon={<MailIcon className="size-4" strokeWidth={1.5} />}
              label="Email"
              href={`mailto:${SITE.email}`}
            />
            <ChannelPill
              icon={<WhatsAppIcon className="size-4" />}
              label="WhatsApp"
              href={SITE.whatsapp}
            />
            <ChannelPill
              icon={<InstagramIcon className="size-4" />}
              label="Instagram"
              href={SITE.instagram}
            />
          </motion.div>

          {/* Bleeds off the section's bottom edge, headline sitting above it
              in the stack — the reference's arrangement. */}
          <div className="relative -z-10 mt-10 hidden w-full max-w-[420px] md:-mt-4 md:block">
            {/* The source frame cropped his arm flat against the photo's
                right edge, so the cutout inherits a hard vertical cut that
                reads as a box against the ambient wash. Fading that edge
                dissolves it; the hero cutout doesn't need this because its
                subject sits clear of the frame sides. */}
            <Image
              src="/opi-cutout-2.webp"
              alt=""
              width={720}
              height={937}
              sizes="420px"
              className="h-auto w-full"
              style={{
                maskImage: 'linear-gradient(to right, black 72%, transparent 99%)',
                WebkitMaskImage:
                  'linear-gradient(to right, black 72%, transparent 99%)',
              }}
            />
          </div>
        </div>

        <motion.form
          variants={revealRight}
          initial="hidden"
          whileInView="visible"
          viewport={ONCE}
          onSubmit={handleSubmit}
          className="flex h-fit flex-col gap-5 rounded-2xl border border-line bg-surface/70 p-6 shadow-panel backdrop-blur-xl md:p-8"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={label}>
              Name
            </label>
            <input id="name" name="name" type="text" required className={field} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input id="email" name="email" type="email" required className={field} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className={label}>
              What do you publish, and how often?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className={`${field} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-1 w-fit rounded-lg bg-amber px-7 py-3 text-small font-medium text-bg transition-transform duration-fast hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && (
            <motion.p
              role="status"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.fast, ease: EASE_OUT }}
              className="text-small text-amber"
            >
              Sent. I reply within a day.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.fast, ease: EASE_OUT }}
              className="text-small text-destructive"
            >
              Something went wrong. Email me directly at{' '}
              <a href={`mailto:${SITE.email}`} className="underline">
                {SITE.email}
              </a>
              .
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
