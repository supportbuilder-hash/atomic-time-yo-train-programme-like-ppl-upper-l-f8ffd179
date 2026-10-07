"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpDown, Activity, Square, Layout, Calendar, Search, Sparkles, ChevronDown, ArrowRight, Clock } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SplitItem = { title: string; frequency: string; bestFor: string; description: string };
type StepItem = { title: string; description: string };
type ProgramItem = { title: string; days: string; focus: string; description: string };
type FAQItem = { question: string; answer: string };

const SPLIT_ICONS = [ArrowUpDown, Activity, Square, Layout];
const STEP_ICONS = [Calendar, Search, Activity, Sparkles];
const PROGRAM_IMAGES = [
  "/images/upper-lower-strength-training.jpg",
  "/images/push-pull-legs-workout.jpg",
  "/images/full-body-home-workout.jpg",
];

export default function HomePage() {
  const t = useTranslations();
  const [openFaq, setOpenFaq] = useState<number>(0);

  const splitItems = (Array.isArray(t.raw("home.splits.items")) ? t.raw("home.splits.items") : []) as SplitItem[];
  const steps = (Array.isArray(t.raw("home.how.steps")) ? t.raw("home.how.steps") : []) as StepItem[];
  const programs = (Array.isArray(t.raw("home.programs.items")) ? t.raw("home.programs.items") : []) as ProgramItem[];
  const faqItems = (Array.isArray(t.raw("home.faq.items")) ? t.raw("home.faq.items") : []) as FAQItem[];

  return (
    <main>
      {/* HERO */}
      <Reveal>
        <section id="hero" className="relative overflow-hidden bg-mesh">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                {t("home.hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                <span className="text-gradient">{t("home.hero.title")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t("home.hero.primaryCta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t("home.hero.secondaryCta")}
                </a>
              </div>
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="glass-strong relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-glow"
            >
              <Image
                src="https://cdn.stocksnap.io/img-thumbs/960w/00RNNUWGLM.jpg"
                alt={t("home.hero.imageAlt")}
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* SPLITS */}
      <Reveal>
        <section id="splits" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t("home.splits.eyebrow")}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("home.splits.title")}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("home.splits.subtitle")}
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {splitItems.map((item, i) => {
              const Icon = SPLIT_ICONS[i] ?? Sparkles;
              return (
                <motion.div
                  key={item.title || i}
                  variants={fadeInUp}
                  className={cn(
                    "surface-elevated rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none",
                    i === 0 && "lg:col-span-2",
                  )}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                    <span className="rounded-full bg-muted px-2.5 py-1">{item.frequency}</span>
                    <span className="rounded-full bg-muted px-2.5 py-1">{item.bestFor}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </Reveal>

      {/* HOW IT WORKS */}
      <Reveal>
        <section id="how-it-works" className="bg-secondary/40 py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.how.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("home.how.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.how.subtitle")}
              </p>
            </div>
            <ol className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {steps.map((step, i) => {
                const Icon = STEP_ICONS[i] ?? Clock;
                return (
                  <Reveal key={step.title || i} delay={i * 0.08}>
                    <li className="flex gap-5 rounded-2xl border border-border bg-card p-6">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </section>
      </Reveal>

      {/* PROGRAMS */}
      <Reveal>
        <section id="programs" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.programs.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("home.programs.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.programs.subtitle")}
              </p>
            </div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {programs.map((program, i) => (
              <motion.article
                key={program.title || i}
                variants={fadeInUp}
                className={cn(
                  "group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none",
                  i === 1 && "lg:-translate-y-4 ring-1 ring-primary/30 shadow-glow",
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={PROGRAM_IMAGES[i] ?? PROGRAM_IMAGES[0]}
                    alt={program.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 360px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                    <span className="rounded-full bg-muted px-2.5 py-1">{program.days}</span>
                    <span className="rounded-full bg-muted px-2.5 py-1">{program.focus}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{program.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{program.description}</p>
                  <Link
                    href="/pricing"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:gap-2.5 motion-reduce:transition-none"
                  >
                    {t("home.programs.cta")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section id="faq" className="bg-secondary/40 py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.faq.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("home.faq.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.faq.subtitle")}
              </p>
            </div>
            <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
              {faqItems.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={item.question || i}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold text-foreground transition hover:bg-muted/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {item.question}
                      <ChevronDown
                        className={cn("h-4 w-4 flex-none text-muted-foreground transition-transform", isOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div id={`faq-panel-${i}`} className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="bg-gradient-brand flex flex-col items-start gap-8 rounded-2xl bg-primary px-8 py-14 text-primary-foreground shadow-glow md:flex-row md:items-center md:justify-between md:px-14">
            <div className="max-w-xl">
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{t("home.cta.title")}</h2>
              <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/85">{t("home.cta.subtitle")}</p>
            </div>
            <div className="flex flex-none flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t("home.cta.primary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="glass inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t("home.cta.secondary")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}