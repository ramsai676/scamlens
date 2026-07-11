'use client';

import { useCallback, useRef, useState } from 'react';
import { analyze, BAND_META, SAMPLES } from '@/lib/engine';
import type { Verdict } from '@/lib/types';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AnimatedNumber } from '@/components/motion-bits';
import {
  AlertIcon,
  CheckIcon,
  CheckShieldIcon,
  EyeIcon,
  FlagIcon,
  QuoteIcon,
  RadarMark,
} from '@/components/icons';

const BAND_STYLE = {
  scam: { color: 'var(--critical)', icon: <AlertIcon className="h-6 w-6" /> },
  suspicious: { color: 'var(--warn)', icon: <EyeIcon className="h-6 w-6" /> },
  ok: { color: 'var(--good-text)', icon: <CheckShieldIcon className="h-6 w-6" /> },
} as const;

export default function Home() {
  const [message, setMessage] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const check = useCallback((text: string) => {
    if (text.trim().length < 8) return;
    setVerdict(analyze(text));
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, []);

  const trySample = (text: string) => {
    setMessage(text);
    check(text);
  };

  const bandStyle = verdict ? BAND_STYLE[verdict.band] : null;
  const bandMeta = verdict ? BAND_META[verdict.band] : null;

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: 'var(--brand)' }}>
            <RadarMark className="h-5 w-5" />
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.01em]">ScamLens</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/ramsai/scamlens" className="text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24">
        {/* hero */}
        <section className="hero-glow mx-auto max-w-2xl pt-10 text-center sm:pt-14">
          <h1 className="rise rise-1 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[50px]">
            Your fraud instincts are <span className="grad-text">out of date</span>.
          </h1>
          <p className="rise rise-2 mx-auto mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-[var(--ink-2)]">
            Scammers use scripts — digital arrest, KYC expiry, task jobs, UPI collect tricks.
            Paste any suspicious message and ScamLens names the script. Instant, free, and{' '}
            <strong className="font-semibold text-[var(--ink)]">nothing leaves your browser</strong>.
          </p>
        </section>

        {/* input */}
        <section
          className="rise rise-3 mt-8 rounded-2xl border p-5 sm:p-6"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste the SMS / WhatsApp message / email here…"
            rows={5}
            className="w-full resize-y rounded-xl border bg-transparent px-4 py-3 text-[15px] leading-relaxed outline-none transition-colors placeholder:text-[var(--ink-3)] focus:border-[var(--brand)]"
            style={{ borderColor: 'var(--hairline-strong)' }}
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {SAMPLES.map((s) => (
                <button
                  key={s.label}
                  onClick={() => trySample(s.text)}
                  className="pressable rounded-full border px-2.5 py-1 text-[12px] font-medium text-[var(--ink-2)] transition-colors hover:border-[var(--brand)] hover:text-[var(--ink)]"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => check(message)}
              className="pressable rounded-xl px-6 py-2.5 text-[14px] font-semibold text-white"
              style={{ background: 'var(--brand)' }}
            >
              Check message
            </button>
          </div>
        </section>

        {/* verdict */}
        {verdict && bandStyle && bandMeta && (
          <div ref={resultRef} className="scroll-mt-6">
            <section
              key={verdict.risk + verdict.band + verdict.matches.length}
              className="fade mt-6 rounded-2xl border p-6"
              style={{
                borderColor: 'color-mix(in srgb, ' + bandStyle.color + ' 35%, transparent)',
                background: 'var(--surface)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="flex items-start gap-4">
                <span className="mt-0.5 shrink-0" style={{ color: bandStyle.color }}>
                  {bandStyle.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-xl font-semibold tracking-[-0.01em]" style={{ color: bandStyle.color }}>
                      {bandMeta.title}
                    </h2>
                    <span className="text-[14px] font-semibold" style={{ fontVariantNumeric: 'tabular-nums', color: bandStyle.color }}>
                      risk <AnimatedNumber value={verdict.risk} />/100
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: 'var(--grid)' }}>
                    <div className="bar-grow h-full rounded-full" style={{ width: `${Math.max(3, verdict.risk)}%`, background: bandStyle.color }} />
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-2)]">{bandMeta.line}</p>
                </div>
              </div>
            </section>

            {/* matched patterns */}
            {verdict.matches.length > 0 && (
              <section className="fade mt-4 space-y-3">
                {verdict.matches.map((m) => (
                  <div
                    key={m.pattern.id}
                    className="card-lift rounded-2xl border p-5"
                    style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
                  >
                    <h3 className="flex items-center gap-2 text-[15px] font-semibold">
                      <FlagIcon className="h-4 w-4" style={{ color: 'var(--critical)' }} />
                      {m.pattern.name}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-2)]">{m.pattern.explain}</p>
                    {m.evidence.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.evidence.slice(0, 4).map((e, i) => (
                          <span
                            key={i}
                            className="inline-flex max-w-full items-center gap-1 truncate rounded-lg px-2 py-1 text-[12px]"
                            style={{ background: 'color-mix(in srgb, var(--critical) 8%, transparent)', color: 'var(--critical)' }}
                          >
                            <QuoteIcon className="h-3 w-3 shrink-0" />
                            <span className="truncate">“{e}”</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* generic flags */}
            {verdict.genericFlags.length > 0 && (
              <section
                className="fade mt-4 rounded-2xl border p-5"
                style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
              >
                <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[var(--ink-2)]">Warning signs in this message</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {verdict.genericFlags.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed">
                      <AlertIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--warn)' }} />
                      <span>
                        <span className="font-medium">{f.label}</span>
                        <span className="text-[var(--ink-3)]"> — “{f.evidence}”</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* advice */}
            {verdict.advice.length > 0 && (
              <section
                className="fade mt-4 rounded-2xl border p-5"
                style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
              >
                <h3 className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: 'var(--good-text)' }}>
                  What to do now
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {verdict.advice.map((a, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--good-text)' }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* footer notes */}
        <section className="mt-12 grid gap-3 text-[13px] leading-relaxed text-[var(--ink-3)] sm:grid-cols-2">
          <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--hairline)' }}>
            <p className="font-medium text-[var(--ink-2)]">Why this exists</p>
            <p className="mt-1">
              AI made scams cheap: cloned voices, perfect grammar, official-looking pages. The
              instincts that protected you five years ago — “it looked real”, “she sounded like my
              daughter” — quietly stopped working. Scripts still give scammers away.
            </p>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--hairline)' }}>
            <p className="font-medium text-[var(--ink-2)]">If money already moved</p>
            <p className="mt-1">
              Call <strong className="text-[var(--ink)]">1930</strong> (national cyber-fraud
              helpline) immediately and file at{' '}
              <a href="https://cybercrime.gov.in" className="underline underline-offset-2" style={{ color: 'var(--brand)' }}>
                cybercrime.gov.in
              </a>
              . Banks can freeze funds if you act within the golden hour.
            </p>
          </div>
        </section>

        <p className="mt-8 text-center text-[12px] text-[var(--ink-3)]">
          16 scam patterns · fully local analysis · open source · part of the <span className="font-medium">Unnoticed</span> series (3 of 5)
        </p>
      </main>
    </div>
  );
}
