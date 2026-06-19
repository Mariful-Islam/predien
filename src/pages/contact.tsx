import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiArrowLongDown } from "react-icons/hi2";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiArrowRight,
  FiGlobe,
  FiZap,
  FiShield,
  FiMessageCircle,
} from "react-icons/fi";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/Home/FAQ";
import Quote from "@/components/Contact/Quote";
import { Flags } from "@/components/Contact/Flags";

import AnchorHeadingPage from "@/components/global/AnchorHeadingPage";
import HeadingPage from "@/components/global/HeadingPage";
import SubHeadingPage from "@/components/global/SubHeadingPage";

const SITE_NAME = "Predien";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://predien.vercel.app";

const PAGE_TITLE = "Contact Predien | Build High-Converting Software Products";
const PAGE_DESCRIPTION =
  "Contact Predien to build premium software, scalable web apps, automation systems, high-converting websites, and modern UI/UX experiences for global businesses.";

const EMAIL = "marifulesgiu@gmail.com";
const PHONE = "+8801823242870";

function cleanUrl(url: string) {
  return url.replace(/\/$/, "");
}

function ContactInfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40 dark:text-blue-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-black text-slate-950 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={value}>
        {content}
      </Link>
    );
  }

  return content;
}

function TrustCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        {icon}
      </div>

      <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
        {text}
      </p>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:text-blue-400"
    >
      {icon}
    </Link>
  );
}

function ContactUs() {
  const canonicalUrl = `${cleanUrl(SITE_URL)}/contact`;
  const ogImage = `${cleanUrl(SITE_URL)}/contact-og.jpg`;

  const contactSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: canonicalUrl,
      mainEntity: {
        "@type": "Organization",
        name: SITE_NAME,
        url: cleanUrl(SITE_URL),
        email: EMAIL,
        telephone: PHONE,
        sameAs: [
          "https://www.linkedin.com/company/predien/",
          "https://x.com/Predien191587",
          "https://www.facebook.com/profile.php?id=61571565728848",
          "https://www.instagram.com/predien_software/",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: EMAIL,
          telephone: PHONE,
          availableLanguage: ["English", "Bengali"],
        },
      },
    }),
    [canonicalUrl],
  );

  return (
    <div className="bg-white selection:bg-blue-500 selection:text-white dark:bg-[#020617]">
      <Head>
        <title>{PAGE_TITLE}</title>

        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/predien.png" />

        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(contactSchema),
          }}
        />
      </Head>

      <Header />

      <section className="relative flex min-h-[86vh] items-center overflow-hidden bg-white pt-24 pb-16 transition-colors duration-700 dark:bg-[#020617] lg:pb-10">
        <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-20">
          <div className="absolute left-[-10%] top-[-10%] h-[680px] w-[680px] rounded-full bg-blue-600/30 blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[560px] w-[560px] rounded-full bg-indigo-600/20 blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 lg:col-span-7"
            >
              <AnchorHeadingPage text="Global Software Partner" />

              <HeadingPage firstText="Let's build" secondText="Together." />

              <SubHeadingPage text="Tell us what you want to build. We help brands create premium software, scalable web apps, automation systems, and high-converting digital experiences." />

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-4 rounded-full bg-blue-600 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20"
                >
                  Get a Quote
                  <HiArrowLongDown className="text-xl" />
                </Link>

                <Link
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-3 rounded-full border border-slate-200 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                >
                  Email Directly
                  <FiArrowRight />
                </Link>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    Remote
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Global Delivery
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    UI/UX
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Premium Design
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    CRO
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Growth Focused
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative lg:col-span-5"
            >
              <div className="relative z-10 overflow-hidden rounded-[40px] border border-slate-200 bg-slate-50 p-6 shadow-[0_50px_100px_-35px_rgba(15,23,42,0.25)] dark:border-white/10 dark:bg-[#090d16] sm:p-8">
                <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6 dark:border-slate-800">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
                      Quick Contact
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                      Start your project
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
                    <FiMessageCircle />
                  </div>
                </div>

                <div className="space-y-4">
                  <ContactInfoCard
                    icon={<FiUser />}
                    label="Founder"
                    value="Mariful Islam Saad"
                  />

                  <ContactInfoCard
                    icon={<FiMapPin />}
                    label="Headquarters"
                    value="Remote / Distributed"
                  />

                  <ContactInfoCard
                    icon={<FiMail />}
                    label="Email"
                    value={EMAIL}
                    href={`mailto:${EMAIL}`}
                  />

                  <ContactInfoCard
                    icon={<FiPhone />}
                    label="Hotline"
                    value={PHONE}
                    href={`tel:${PHONE}`}
                  />
                </div>

                <div className="mt-8 rounded-3xl bg-slate-950 p-5 text-white dark:bg-white dark:text-slate-950">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-300 dark:text-blue-600">
                    Best for
                  </p>

                  <p className="mt-2 text-lg font-black leading-tight">
                    Web apps, SaaS platforms, ecommerce systems, automation,
                    UI/UX, and conversion-focused websites.
                  </p>

                  <Link
                    href="#contact"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition-all hover:bg-blue-700"
                  >
                    Request Proposal
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
                  <p className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                    Social Ecosystem
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <SocialLink
                      href="https://www.linkedin.com/company/predien/"
                      label="Predien LinkedIn"
                      icon={<FaLinkedin />}
                    />
                    <SocialLink
                      href="https://x.com/Predien191587"
                      label="Predien X"
                      icon={<FaXTwitter />}
                    />
                    <SocialLink
                      href="https://www.facebook.com/profile.php?id=61571565728848"
                      label="Predien Facebook"
                      icon={<FaFacebook />}
                    />
                    <SocialLink
                      href="https://www.instagram.com/predien_software/"
                      label="Predien Instagram"
                      icon={<FaInstagram />}
                    />
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-6 -top-6 hidden h-full w-full rounded-[40px] border border-slate-200 dark:border-blue-500/10 sm:block" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 transition-colors duration-700 dark:bg-[#01040f]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
              Why Work With Us
            </p>

            <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
              Built for serious outcomes
              <span className="text-blue-600 dark:text-blue-500">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <TrustCard
              icon={<FiZap />}
              title="Conversion-First Execution"
              text="We design pages, flows, and systems with clear user actions, clean friction points, and growth-focused structure."
            />

            <TrustCard
              icon={<FiShield />}
              title="Reliable Engineering"
              text="We build scalable architecture, maintainable code, and modern interfaces with performance in mind."
            />

            <TrustCard
              icon={<FiGlobe />}
              title="Remote Global Delivery"
              text="Work with a distributed software team that can support international projects with flexible communication."
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 transition-colors duration-700 dark:bg-[#020617]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-8">
          <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-8 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
                Global Footprint
              </p>

              <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
                Built for worldwide brands
                <span className="text-blue-600 dark:text-blue-500">.</span>
              </h2>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Distributed Delivery
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Flags.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.04, 0.24),
                }}
                className="group relative rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl grayscale transition-all duration-700 group-hover:grayscale-0">
                  <Image
                    src={item.src}
                    alt="Predien global client region"
                    fill
                    sizes="(max-width: 768px) 50vw, 15vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="scroll-mt-[90px]" id="contact">
        <Quote />
      </div>

      <FAQ />

      <Footer />
    </div>
  );
}

export default ContactUs;