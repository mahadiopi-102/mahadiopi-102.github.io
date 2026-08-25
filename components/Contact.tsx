'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { MailIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { DUR, EASE_OUT, stagger, reveal, ONCE } from '@/lib/motion';
import { SITE } from '@/content/site';
import { WhatsAppIcon, InstagramIcon } from '@/components/BrandIcons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Built off the 21st.dev "Let's work together" reference Opi picked --
 * centered, minimal, one clear thing to do. That reference has a single
 * circular arrow button; this needed three equally-weighted ones (email,
 * WhatsApp, Instagram) rather than one favoured channel with the other two
 * hidden, per Opi's explicit follow-up. Each is a labelled pill, not an
 * icon-only circle someone has to guess at or hover to identify.
 */
function ChannelButton({
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
      className="group flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-3 pl-4 pr-5 text-small font-medium text-ink backdrop-blur-md transition-colors duration-fast hover:border-amber/60 hover:text-amber active:scale-[0.98]"
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

      {/* Centered, single column -- the "Let's work together" reference's
          structure, picked over the split form-card layout. */}
      <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center text-center">
        <Reveal>
          {SITE.availableForWork && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-label uppercase text-ink-3">
              <span className="relative flex size-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-amber" />
              </span>
              Available for work
            </p>
          )}
          {/* Two-tone treatment from the reference: one line at full
              contrast, the next stepped down -- there it's a weight change
              (thin vs thin), but this site locks bold everywhere, so the
              contrast is carried by color instead. */}
          <h2 className="text-[clamp(2.8rem,6vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            <span className="block text-amber">Tell me</span>
            <span className="block text-ink-3">what you publish.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[42ch] text-lead text-ink-2">
            You talk to me directly. No handoffs, no account managers.
          </p>
        </Reveal>

        {/* Three equally-weighted channels rather than the reference's one
            arrow button -- Opi asked specifically that WhatsApp and
            Instagram be just as easy to find as email, not a favoured
            channel with the others requiring a hover or a hunt. */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={ONCE}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.div variants={reveal}>
            <ChannelButton
              icon={<MailIcon className="size-4" strokeWidth={1.5} />}
              label="Email"
              href={`mailto:${SITE.email}`}
            />
          </motion.div>
          <motion.div variants={reveal}>
            <ChannelButton
              icon={<WhatsAppIcon className="size-4" />}
              label="WhatsApp"
              href={SITE.whatsapp}
            />
          </motion.div>
          <motion.div variants={reveal}>
            <ChannelButton
              icon={<InstagramIcon className="size-4" />}
              label="Instagram"
              href={SITE.instagram}
            />
          </motion.div>
        </motion.div>

        <div className="my-10 flex w-full items-center gap-4 text-label text-ink-4">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono uppercase tracking-wide">
            Or send the details
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <motion.form
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={ONCE}
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-5 rounded-2xl border border-line bg-surface/70 p-6 text-left shadow-panel backdrop-blur-xl md:p-8"
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
