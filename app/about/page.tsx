"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Activity, ArrowRight, Calendar, Check, Circle, Clock, Heart, Sparkles, Star, User } from 'lucide-react';
import Reveal from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Milestone = { year: string; title: string; description: string };
type Credential = { title: string; issuer: string };
type Principle = { title: string; description: string };
type Testimonial = { quote: string; name: string; role: string };

const CREDENTIAL_ICONS = [Star, Check, Activity, Heart, Sparkles, Calendar];
const PRINCIPLE_ICONS = [Activity, Heart, Circle, Clock];

const cardHover: Variants = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
};

export default function AboutPage() {
  const t = useTranslations();

  const milestones = (Array.isArray(t.raw("about.story.milestones")) ? t.raw("about.story.milestones") : []) as Milestone[];
  const credentials = (Array.isArray(t.raw("about.credentials.items")) ? t.raw("about.credentials.items") : []) as Credential[];
  const principles = (Array.isArray(t.raw("about.approach.principles")) ? t.raw("about.approach.principles") : []) as Principle[];
  const testimonials = (Array.isArray(t.raw("about.testimonials.items")) ? t.raw("about.testimonials.items") : []) as Testimonial[];

  return (
    <main className="bg-background">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-mesh">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-24 text-center md:py-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              {t("about.hero.eyebrow")}
            </span>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              {t("about.hero.title")}
              <span className="text-gradient"> {t("about.hero.titleAccent")}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("about.hero.subtitle")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t("about.hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-card-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t("about.hero.ctaSecondary")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Trainer story */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative order-2 md:order-1">
              <div className="overflow-hidden rounded-2xl border border-border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                <Image
                  src="https://cdn.stocksnap.io/img-thumbs/960w/EJEVZOGS4W.jpg"
                  alt={t("about.story.imageAlt")}
                  width={640}
                  height={760}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="glass absolute -bottom-6 -right-6 hidden rounded-xl px-5 py-4 shadow-glow sm:block">
                <p className="text-2xl font-semibold text-foreground">8+</p>
                <p className="text-xs text-muted-foreground">{t("about.story.badgeLabel")}</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("about.story.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {t("about.story.title")}
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{t("about.story.paragraph1")}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t("about.story.paragraph2")}</p>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-foreground">
                {t("about.story.milestonesTitle")}
              </h3>
              <ol className="mt-4 space-y-5 border-l border-border pl-6">
                {milestones.map((m, i) => (
                  <li key={`${m.year}-${i}`} className="relative">
                    <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" aria-hidden="true" />
                    <p className="text-sm font-semibold text-primary">{m.year}</p>
                    <p className="mt-0.5 font-medium text-foreground">{m.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{m.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Credentials */}
      <Reveal>
        <section className="bg-secondary/40 py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("about.credentials.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {t("about.credentials.title")}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t("about.credentials.subtitle")}</p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {credentials.map((c, i) => {
                const Icon = CREDENTIAL_ICONS[i % CREDENTIAL_ICONS.length];
                return (
                  <motion.div
                    key={`${c.title}-${i}`}
                    variants={fadeInUp}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    className="group"
                  >
                    <motion.div
                      variants={cardHover}
                      className="surface-elevated flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-semibold text-card-foreground">{c.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Approach */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("about.approach.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {t("about.approach.title")}
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{t("about.approach.subtitle")}</p>
            </div>
            <div className="divide-y divide-border">
              {principles.map((p, i) => {
                const Icon = PRINCIPLE_ICONS[i % PRINCIPLE_ICONS.length];
                return (
                  <div key={`${p.title}-${i}`} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-foreground">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{p.title}</p>
                      <p className="mt-1 leading-relaxed text-muted-foreground">{p.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Testimonials */}
      <Reveal>
        <section className="bg-mesh py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("about.testimonials.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {t("about.testimonials.title")}
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
            >
              {testimonials.map((item, i) => (
                <motion.div
                  key={`${item.name}-${i}`}
                  variants={fadeInUp}
                  className={cn(
                    "glass flex h-full flex-col gap-4 rounded-2xl p-6",
                    i === 0 && "md:translate-y-[-8px]"
                  )}
                >
                  <div className="flex gap-1 text-primary">
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="flex-1 text-balance leading-relaxed text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Final CTA */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-8 py-16 text-center shadow-glow md:px-16 md:py-20">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-primary-foreground md:text-4xl">
              {t("about.cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/85">
              {t("about.cta.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t("about.cta.primary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="glass inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t("about.cta.secondary")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}