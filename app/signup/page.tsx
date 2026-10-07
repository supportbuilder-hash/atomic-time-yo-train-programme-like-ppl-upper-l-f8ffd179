"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Activity, Check, Sparkles } from 'lucide-react';
import Reveal from "@/components/Reveal";
import Hero from "@/components/blocks/Hero";
import FeatureGrid, { type FeatureItem } from "@/components/blocks/FeatureGrid";
import FAQ, { type FAQItem } from "@/components/blocks/FAQ";
import { Section, SectionHeader } from "@/components/blocks/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { staggerContainer, fadeInUp } from "@/lib/motion";

type ProgramItem = { name: string; price: string; description: string };

const BENEFIT_ICONS = [Check, Sparkles, Activity];

export default function SignUpPage() {
  const t = useTranslations();

  const programs = (Array.isArray(t.raw("signupPage.programs.items")) ? t.raw("signupPage.programs.items") : []) as ProgramItem[];
  const benefitItems = (Array.isArray(t.raw("signupPage.benefits.items")) ? t.raw("signupPage.benefits.items") : []) as {
    title: string;
    description: string;
  }[];
  const faqItems = (Array.isArray(t.raw("signupPage.faq.items")) ? t.raw("signupPage.faq.items") : []) as FAQItem[];

  const [selectedProgram, setSelectedProgram] = useState<string>(programs[0]?.name ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const programOptions = programs.map((p) => ({ value: p.name, label: `${p.name} - ${p.price}` }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  const featureItems: FeatureItem[] = benefitItems.map((item, i) => {
    const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
    return {
      title: item.title,
      description: item.description,
      icon: <Icon className="h-5 w-5" aria-hidden="true" />,
    };
  });

  return (
    <main className="bg-background text-foreground">
      <Hero
        id="hero"
        eyebrow={t("signupPage.hero.eyebrow")}
        title={t("signupPage.hero.title")}
        subtitle={t("signupPage.hero.subtitle")}
        variant="mesh"
      />

      {/* Signup form */}
      <Section id="signup-form">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl"
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-lg border border-border bg-card p-8 text-card-foreground shadow-sm"
          >
            {submitted ? (
              <p role="status" className="rounded-lg border border-border bg-muted p-6 text-center font-medium">
                {t("signupPage.form.successMessage")}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t("signupPage.form.nameLabel")}</Label>
                  <Input id="signup-name" name="name" autoComplete="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t("signupPage.form.emailLabel")}</Label>
                  <Input id="signup-email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t("signupPage.form.passwordLabel")}</Label>
                  <Input id="signup-password" name="password" type="password" autoComplete="new-password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-program">{t("signupPage.form.programLabel")}</Label>
                  <Select
                    id="signup-program"
                    name="program"
                    options={programOptions}
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" disabled={submitting} className="w-full">
                  {submitting ? t("signupPage.form.submittingLabel") : t("signupPage.form.submitLabel")}
                </Button>
              </form>
            )}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {t("signupPage.form.loginPrompt")}{" "}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                {t("signupPage.form.loginLinkLabel")}
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </Section>

      {/* Benefits */}
      <FeatureGrid
        id="benefits"
        eyebrow={t("signupPage.benefits.eyebrow")}
        title={t("signupPage.benefits.title")}
        subtitle={t("signupPage.benefits.subtitle")}
        items={featureItems}
        columns={3}
        variant="cards"
      />

      {/* Program summary cards */}
      <Reveal>
        <Section id="program-summary" className="bg-muted/40">
          <SectionHeader
            eyebrow={t("signupPage.programs.eyebrow")}
            title={t("signupPage.programs.title")}
            subtitle={t("signupPage.programs.subtitle")}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.name}
                className="flex flex-col rounded-lg border border-border bg-card p-8 text-card-foreground shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <h3 className="font-display text-xl font-semibold">{program.name}</h3>
                <p className="mt-2 text-3xl font-bold text-primary">{program.price}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{program.description}</p>
                <Button
                  type="button"
                  variant={selectedProgram === program.name ? "default" : "outline"}
                  className="mt-6"
                  onClick={() => setSelectedProgram(program.name)}
                >
                  {t("signupPage.programs.selectLabel")}
                </Button>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* FAQ */}
      <FAQ
        id="faq"
        eyebrow={t("signupPage.faq.eyebrow")}
        title={t("signupPage.faq.title")}
        subtitle={t("signupPage.faq.subtitle")}
        items={faqItems}
        variant="simple"
      />
    </main>
  );
}
