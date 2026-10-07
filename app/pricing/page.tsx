"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check, X, Star, Sparkles, Activity, ChevronDown, ArrowRight } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  highlighted: boolean;
  badge?: string;
};

type ComparisonRow = {
  feature: string;
  oneTime: string;
  membership: string;
  coaching: string;
};

type FaqItem = { question: string; answer: string };

const TIER_ICONS = [Activity, Sparkles, Star];

export default function PricingPage() {
  const t = useTranslations();
  const [openFaq, setOpenFaq] = useState<number>(0);

  const tiers = (Array.isArray(t.raw("pricingPage.tiers")) ? t.raw("pricingPage.tiers") : []) as Tier[];
  const comparisonRows = (Array.isArray(t.raw("pricingPage.comparison.rows"))
    ? t.raw("pricingPage.comparison.rows")
    : []) as ComparisonRow[];
  const faqItems = (Array.isArray(t.raw("pricingPage.faq.items")) ? t.raw("pricingPage.faq.items") : []) as FaqItem[];

  return (
    <main className="bg-background text-foreground">
      {/* Pricing header */}
      <Reveal>
        <section className="relative overflow-hidden bg-mesh py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              {t("pricingPage.hero.eyebrow")}
            </span>
            <h1 className="mt-6 text-balance text-4xl font-display font-semibold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-gradient">{t("pricingPage.hero.title")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("pricingPage.hero.subtitle")}
            </p>
          </div>
        </section>
      </Reveal>

      {/* Pricing tiers */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch"
          >
            {tiers.map((tier, i) => {
              const Icon = TIER_ICONS[i % TIER_ICONS.length];
              return (
                <motion.div
                  key={tier.name}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  className={cn(
                    "relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ease-out",
                    tier.highlighted
                      ? "border-primary/40 bg-gradient-brand text-primary-foreground shadow-glow lg:scale-105"
                      : "surface-elevated border-border bg-card text-card-foreground",
                  )}
                >
                  {tier.badge ? (
                    <span
                      className={cn(
                        "absolute -top-3 left-8 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
                        tier.highlighted
                          ? "bg-primary-foreground text-primary"
                          : "bg-primary text-primary-foreground",
                      )}
                    >
                      {tier.badge}
                    </span>
                  ) : null}

                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full",
                      tier.highlighted ? "bg-primary-foreground/15" : "bg-primary/10",
                    )}
                  >
                    <Icon
                      className={cn("h-5 w-5", tier.highlighted ? "text-primary-foreground" : "text-primary")}
                      aria-hidden="true"
                    />
                  </div>

                  <h2 className="mt-5 text-xl font-display font-semibold">{tier.name}</h2>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed",
                      tier.highlighted ? "text-primary-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    {tier.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-display font-semibold tracking-tight">{tier.price}</span>
                    <span
                      className={cn(
                        "text-sm",
                        tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground",
                      )}
                    >
                      {tier.period}
                    </span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            tier.highlighted ? "text-primary-foreground" : "text-primary",
                          )}
                          aria-hidden="true"
                        />
                        <span className={tier.highlighted ? "text-primary-foreground/90" : "text-foreground/90"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={cn(
                      "mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      tier.highlighted
                        ? "bg-primary-foreground text-primary hover:opacity-90"
                        : "bg-primary text-primary-foreground hover:opacity-90",
                    )}
                  >
                    {tier.ctaLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features comparison */}
      <Reveal>
        <section className="bg-muted/40 py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-display font-semibold tracking-tight sm:text-4xl">
                {t("pricingPage.comparison.title")}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">{t("pricingPage.comparison.subtitle")}</p>
            </div>

            <div className="mt-12 overflow-x-auto rounded-2xl border border-border bg-card shadow-glow">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="px-6 py-4 font-medium text-muted-foreground">
                      {t("pricingPage.comparison.header.feature")}
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-muted-foreground">
                      {t("pricingPage.comparison.header.oneTime")}
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-primary">
                      {t("pricingPage.comparison.header.membership")}
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-muted-foreground">
                      {t("pricingPage.comparison.header.coaching")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={cn(i % 2 === 1 && "bg-muted/30", "border-b border-border last:border-0")}>
                      <th scope="row" className="px-6 py-4 font-medium text-foreground">
                        {row.feature}
                      </th>
                      <td className="px-6 py-4 text-muted-foreground">
                        <ComparisonCell value={row.oneTime} />
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">
                        <ComparisonCell value={row.membership} />
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <ComparisonCell value={row.coaching} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("pricingPage.faq.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight sm:text-4xl">
                {t("pricingPage.faq.title")}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">{t("pricingPage.faq.subtitle")}</p>
            </div>

            <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
              {faqItems.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="font-medium text-foreground">{item.question}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                          isOpen && "rotate-180 text-primary",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen ? (
                      <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.answer}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Final CTA */}
      <Reveal>
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-brand px-8 py-16 text-center text-primary-foreground shadow-glow sm:px-16">
              <h2 className="text-balance text-3xl font-display font-semibold tracking-tight sm:text-4xl">
                {t("pricingPage.cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/80">
                {t("pricingPage.cta.subtitle")}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-foreground px-6 text-sm font-semibold text-primary transition-all duration-300 ease-out hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("pricingPage.cta.primaryLabel")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="glass inline-flex h-11 items-center justify-center rounded-lg border border-primary-foreground/30 px-6 text-sm font-semibold text-primary-foreground transition-all duration-300 ease-out hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("pricingPage.cta.secondaryLabel")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}

function ComparisonCell({ value }: { value: string }) {
  if (value === "—" || value.trim() === "") {
    return <X className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />;
  }
  return <span>{value}</span>;
}