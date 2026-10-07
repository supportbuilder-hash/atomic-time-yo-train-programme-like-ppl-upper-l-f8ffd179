"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Hero from "@/components/blocks/Hero";
import StatsBand, { type StatItem } from "@/components/blocks/StatsBand";
import Testimonials from "@/components/blocks/Testimonials";
import CTA from "@/components/blocks/CTA";
import { Section, SectionHeader } from "@/components/blocks/shared";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

type StoryItem = {
  name: string;
  program: string;
  quote: string;
  result: string;
  beforeImage: string;
  afterImage: string;
};

export default function SuccessStoriesPage() {
  const t = useTranslations();

  const stats = (Array.isArray(t.raw("successStoriesPage.stats.items")) ? t.raw("successStoriesPage.stats.items") : []) as StatItem[];
  const stories = (Array.isArray(t.raw("successStoriesPage.stories.items")) ? t.raw("successStoriesPage.stories.items") : []) as StoryItem[];

  const featuredTestimonials = stories.slice(0, 3).map((s) => ({ quote: s.quote, name: s.name, role: s.program }));

  return (
    <main>
      <Hero
        id="hero"
        eyebrow={t("successStoriesPage.hero.eyebrow")}
        title={t("successStoriesPage.hero.title")}
        subtitle={t("successStoriesPage.hero.subtitle")}
        primaryCta={{ label: t("successStoriesPage.hero.primaryLabel"), href: "/signup" }}
        variant="mesh"
      />

      <StatsBand id="stats" items={stats} variant="glass" />

      <Section id="stories">
        <SectionHeader
          eyebrow={t("successStoriesPage.stories.eyebrow")}
          title={t("successStoriesPage.stories.title")}
          subtitle={t("successStoriesPage.stories.subtitle")}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {stories.map((story, i) => (
            <motion.div
              key={story.name + i}
              variants={fadeInUp}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid grid-cols-2 gap-0.5">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={story.beforeImage} alt={`${story.name} before`} className="aspect-[3/4] w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded bg-foreground/70 px-2 py-0.5 text-xs text-background">
                    {t("successStoriesPage.stories.beforeLabel")}
                  </span>
                </div>
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={story.afterImage} alt={`${story.name} after`} className="aspect-[3/4] w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded bg-foreground/70 px-2 py-0.5 text-xs text-background">
                    {t("successStoriesPage.stories.afterLabel")}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold">{story.name}</h3>
                <p className="text-sm text-primary">{story.program}</p>
                <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">&ldquo;{story.quote}&rdquo;</p>
                <p className="mt-2 text-sm font-medium">{story.result}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Testimonials
        id="featured"
        eyebrow={t("successStoriesPage.featured.eyebrow")}
        title={t("successStoriesPage.featured.title")}
        subtitle={t("successStoriesPage.featured.subtitle")}
        items={featuredTestimonials}
        variant="glass"
      />

      <CTA
        id="cta"
        title={t("successStoriesPage.cta.title")}
        subtitle={t("successStoriesPage.cta.subtitle")}
        primaryCta={{ label: t("successStoriesPage.cta.primaryLabel"), href: "/signup" }}
        variant="gradient"
      />
    </main>
  );
}
