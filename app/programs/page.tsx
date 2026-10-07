"use client";

import { useTranslations } from "next-intl";
import { ArrowUpDown, Activity, Square } from 'lucide-react';
import Hero from "@/components/blocks/Hero";
import FeatureGrid, { type FeatureItem } from "@/components/blocks/FeatureGrid";
import FAQ, { type FAQItem } from "@/components/blocks/FAQ";
import CTA from "@/components/blocks/CTA";
import { Section, SectionHeader } from "@/components/blocks/shared";
import Reveal from "@/components/Reveal";

type SplitItem = {
  title: string;
  frequency: string;
  schedule: string;
  equipment: string;
  bestFor: string;
  description: string;
};

type ScheduleItem = { day: string; focus: string; description: string };

const SPLIT_ICONS = [ArrowUpDown, Activity, Square];

export default function ProgramsPage() {
  const t = useTranslations();

  const splitItems = (Array.isArray(t.raw("programsPage.splits.items"))
    ? t.raw("programsPage.splits.items")
    : []) as SplitItem[];

  const scheduleItems = (Array.isArray(t.raw("programsPage.schedule.items"))
    ? t.raw("programsPage.schedule.items")
    : []) as ScheduleItem[];

  const faqItems = (Array.isArray(t.raw("programsPage.faq.items"))
    ? t.raw("programsPage.faq.items")
    : []) as FAQItem[];

  const featureItems: FeatureItem[] = splitItems.map((item, i) => {
    const Icon = SPLIT_ICONS[i % SPLIT_ICONS.length];
    return {
      title: item.title,
      description: `${item.description} ${item.bestFor} Frequency: ${item.frequency}. Equipment: ${item.equipment}.`,
      icon: <Icon className="h-5 w-5" aria-hidden="true" />,
    };
  });

  return (
    <main className="bg-background text-foreground">
      <Hero
        variant="mesh"
        eyebrow={t("programsPage.hero.eyebrow")}
        title={t("programsPage.hero.title")}
        subtitle={t("programsPage.hero.subtitle")}
        primaryCta={{ label: t("cta.primary"), href: "/signup" }}
        secondaryCta={{ label: t("programsPage.hero.secondaryLabel"), href: "/pricing" }}
      />

      <FeatureGrid
        id="splits"
        eyebrow={t("programsPage.splits.eyebrow")}
        title={t("programsPage.splits.title")}
        subtitle={t("programsPage.splits.subtitle")}
        items={featureItems}
        columns={3}
        variant="glass"
      />

      <Reveal>
        <section className="bg-muted/40 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              eyebrow={t("programsPage.schedule.eyebrow")}
              title={t("programsPage.schedule.title")}
              subtitle={t("programsPage.schedule.subtitle")}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {scheduleItems.map((item) => (
                <div
                  key={item.day}
                  className="flex flex-col rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{item.day}</span>
                  <h3 className="mt-2 font-display text-base font-semibold">{item.focus}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <FAQ
        id="faq"
        eyebrow={t("programsPage.faq.eyebrow")}
        title={t("programsPage.faq.title")}
        subtitle={t("programsPage.faq.subtitle")}
        items={faqItems}
        variant="split"
      />

      <CTA
        variant="gradient"
        title={t("programsPage.cta.title")}
        subtitle={t("programsPage.cta.subtitle")}
        primaryCta={{ label: t("programsPage.cta.primaryLabel"), href: "/signup" }}
        secondaryCta={{ label: t("programsPage.cta.secondaryLabel"), href: "/pricing" }}
      />
    </main>
  );
}
