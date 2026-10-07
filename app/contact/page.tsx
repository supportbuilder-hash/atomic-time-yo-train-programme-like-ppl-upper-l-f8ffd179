"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Clock, Activity, Info, MessageCircle as Twitter, Globe as Facebook, Briefcase as Linkedin, ChevronDown, Check, AlertCircle, Send } from 'lucide-react';
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/motion";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type FaqItem = { question: string; answer: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

const INITIAL_VALUES: FormValues = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const t = useTranslations();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = (
    Array.isArray(t.raw("contactPage.faq.items")) ? t.raw("contactPage.faq.items") : []
  ) as FaqItem[];

  function validate(current: FormValues): FormErrors {
    const next: FormErrors = {};
    if (!current.name.trim()) next.name = t("contactPage.form.errorName");
    if (!EMAIL_PATTERN.test(current.email.trim())) next.email = t("contactPage.form.errorEmail");
    if (!current.subject.trim()) next.subject = t("contactPage.form.errorSubject");
    if (current.message.trim().length < MIN_MESSAGE_LENGTH) next.message = t("contactPage.form.errorMessage");
    return next;
  }

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setSubmitted(true);
    setValues(INITIAL_VALUES);
    setErrors({});
  }

  const infoRows: { icon: typeof Mail; labelKey: string; valueKey: string }[] = [
    { icon: Mail, labelKey: "contactPage.info.emailLabel", valueKey: "contactPage.info.emailValue" },
    { icon: Activity, labelKey: "contactPage.info.phoneLabel", valueKey: "contactPage.info.phoneValue" },
    { icon: Info, labelKey: "contactPage.info.addressLabel", valueKey: "contactPage.info.addressValue" },
    { icon: Clock, labelKey: "contactPage.info.hoursLabel", valueKey: "contactPage.info.hoursValue" },
  ];

  return (
    <main className="bg-background text-foreground">
      <Reveal>
        <section className="relative overflow-hidden bg-mesh py-24 md:py-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
            <span className="inline-flex items-center rounded-full border border-border bg-card/60 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("contactPage.header.eyebrow")}
            </span>
            <h1 className="mt-6 text-balance font-display text-4xl font-bold tracking-tight md:text-5xl">
              <span className="text-gradient">{t("contactPage.header.title")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("contactPage.header.subtitle")}
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="surface-elevated rounded-2xl border border-border bg-card p-6 shadow-glow md:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h2 className="font-display text-2xl font-semibold tracking-tight">
                      {t("contactPage.form.successTitle")}
                    </h2>
                    <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {t("contactPage.form.successMessage")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-2 inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition-all duration-300 ease-out hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {t("contactPage.form.submitLabel")}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-name" className="text-sm font-medium">
                          {t("contactPage.form.nameLabel")}
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder={t("contactPage.form.namePlaceholder")}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "contact-name-error" : undefined}
                          className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        {errors.name && (
                          <span id="contact-name-error" className="flex items-center gap-1.5 text-xs text-destructive">
                            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            {errors.name}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-email" className="text-sm font-medium">
                          {t("contactPage.form.emailLabel")}
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder={t("contactPage.form.emailPlaceholder")}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "contact-email-error" : undefined}
                          className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        {errors.email && (
                          <span id="contact-email-error" className="flex items-center gap-1.5 text-xs text-destructive">
                            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-subject" className="text-sm font-medium">
                        {t("contactPage.form.subjectLabel")}
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={values.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        placeholder={t("contactPage.form.subjectPlaceholder")}
                        aria-invalid={Boolean(errors.subject)}
                        aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                        className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring"
                      />
                      {errors.subject && (
                        <span id="contact-subject-error" className="flex items-center gap-1.5 text-xs text-destructive">
                          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-message" className="text-sm font-medium">
                        {t("contactPage.form.messageLabel")}
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={values.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder={t("contactPage.form.messagePlaceholder")}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "contact-message-error" : undefined}
                        className="resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring"
                      />
                      {errors.message && (
                        <span id="contact-message-error" className="flex items-center gap-1.5 text-xs text-destructive">
                          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:translate-y-0 disabled:opacity-70 motion-reduce:transition-none"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {submitting ? t("contactPage.form.submittingLabel") : t("contactPage.form.submitLabel")}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-2"
            >
              <motion.div variants={fadeInUp} className="glass rounded-2xl border border-border p-6 md:p-8">
                <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("contactPage.info.eyebrow")}
                </span>
                <h2 className="mt-4 text-balance font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {t("contactPage.info.title")}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t("contactPage.info.subtitle")}
                </p>

                <div className="mt-8 flex flex-col gap-5">
                  {infoRows.map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.labelKey} className="flex items-start gap-3.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            {t(row.labelKey)}
                          </span>
                          <span className="text-sm font-medium">{t(row.valueKey)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 border-t border-border pt-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t("contactPage.info.socialTitle")}
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("contactPage.info.socialTwitter")}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Twitter className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("contactPage.info.socialFacebook")}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Facebook className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("contactPage.info.socialLinkedin")}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-muted/40 py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("contactPage.faq.eyebrow")}
              </span>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
                {t("contactPage.faq.title")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("contactPage.faq.subtitle")}
              </p>
            </div>

            <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
              {faqItems.map((item, i) => (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-200 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-medium">{item.question}</span>
                    <ChevronDown
                      className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300", openFaq === i && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                  {openFaq === i && (
                    <div id={`faq-panel-${i}`} className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}