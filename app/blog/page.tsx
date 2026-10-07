"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Hero from "@/components/blocks/Hero";
import CTA from "@/components/blocks/CTA";
import { Section, SectionHeader } from "@/components/blocks/shared";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
};

export default function BlogPage() {
  const t = useTranslations();

  const posts = (Array.isArray(t.raw("blogPage.posts.items")) ? t.raw("blogPage.posts.items") : []) as BlogPost[];
  const categories = (Array.isArray(t.raw("blogPage.categories.items")) ? t.raw("blogPage.categories.items") : []) as string[];

  return (
    <main className="bg-background text-foreground">
      <Hero
        eyebrow={t("blogPage.hero.eyebrow")}
        title={t("blogPage.hero.title")}
        subtitle={t("blogPage.hero.subtitle")}
        primaryCta={{ label: t("blogPage.hero.cta"), href: "#posts" }}
        variant="mesh"
      />

      <Section id="posts">
        <SectionHeader
          eyebrow={t("blogPage.posts.eyebrow")}
          title={t("blogPage.posts.title")}
          subtitle={t("blogPage.posts.subtitle")}
        />

        {categories.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        )}

        <Reveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <motion.article
                key={post.title}
                variants={fadeInUp}
                className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <Badge className="mb-3">{post.category}</Badge>
                  <h3 className="font-display text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Reveal>
      </Section>

      <CTA
        title={t("blogPage.newsletter.title")}
        subtitle={t("blogPage.newsletter.subtitle")}
        primaryCta={{ label: t("blogPage.newsletter.submitLabel"), href: "/signup" }}
        variant="banner"
      />
    </main>
  );
}
