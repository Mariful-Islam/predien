import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import type { GetServerSidePropsContext } from "next";

import { HiArrowLongDown } from "react-icons/hi2";
import {
  FiBriefcase,
  FiMapPin,
  FiArrowRight,
  FiUsers,
  FiZap,
  FiCode,
} from "react-icons/fi";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnchorHeadingPage from "@/components/global/AnchorHeadingPage";
import HeadingPage from "@/components/global/HeadingPage";
import SubHeadingPage from "@/components/global/SubHeadingPage";

import CareerHero from "@/assets/career.png";

type JobItem = {
  _id?: string;
  id?: string;
  job_title: string;
  slug: string;
  duration?: string;
  location?: string;
  type?: string;
  department?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

type CareerProps = {
  data: JobItem[];
  canonicalUrl: string;
  unavailable?: boolean;
};

const SITE_NAME = "Predien";
const PAGE_TITLE = "Predien Careers | Build the Future with Us";
const PAGE_DESCRIPTION =
  "Join Predien and work with a modern engineering team building scalable software, automation systems, and future-ready digital products.";

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function cleanUrl(url: string) {
  return url.replace(/\/$/, "");
}

function normalizeArray(value: any): any[] {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.jobs)) return value.jobs;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.result)) return value.result;

  return [];
}

function removeDuplicateJobs(jobs: JobItem[]) {
  const seen = new Set<string>();

  return jobs.filter((job) => {
    if (!job?.slug || !job?.job_title) return false;

    if (seen.has(job.slug)) return false;

    seen.add(job.slug);
    return true;
  });
}

function getJobId(job: JobItem, index: number) {
  return job._id || job.id || job.slug || String(index);
}

function makeAbsoluteUrl(url: string | undefined, siteOrigin: string) {
  if (!url) return `${siteOrigin}/career-og.jpg`;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${siteOrigin}${url}`;
  }

  return `${siteOrigin}/${url}`;
}

function CareerBenefitCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950">
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

function JobCard({ item, index }: { item: JobItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.25),
      }}
      className="group"
    >
      <Link
        href={`/job/${item.slug}`}
        aria-label={`Apply for ${item.job_title}`}
        className="block rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_26px_80px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-[#090d16] sm:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <FiBriefcase />
                {item.duration || item.type || "Full Time"}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <FiMapPin />
                {item.location || "Remote / On-site"}
              </span>

              {item.department && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  {item.department}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-black tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-500 sm:text-3xl">
              {item.job_title}
            </h3>
{/* 
            {item.description && (
              <p className="mt-3 line-clamp-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
            )} */}
          </div>

          <div className="flex shrink-0 items-center">
            <div className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition-all duration-300 group-hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:group-hover:bg-blue-500 dark:group-hover:text-white sm:w-auto">
              <span>Apply Now</span>
              <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

const Career: React.FC<CareerProps> = ({
  data,
  canonicalUrl,
  unavailable = false,
}) => {
  const jobs = useMemo(() => removeDuplicateJobs(data || []), [data]);

  const siteOrigin = useMemo(() => {
    try {
      return new URL(canonicalUrl).origin;
    } catch {
      return "https://predien.vercel.app";
    }
  }, [canonicalUrl]);

  const ogImage = makeAbsoluteUrl("/career-og.jpg", siteOrigin);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${siteOrigin}/predien.png`,
      },
    },
  };

  const jobPostingSchema = jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.job_title,
    description:
      job.description ||
      `Apply for ${job.job_title} at Predien and join a modern software engineering team.`,
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: siteOrigin,
      logo: `${siteOrigin}/predien.png`,
    },
    employmentType: job.duration || job.type || "FULL_TIME",
    datePosted: job.createdAt || new Date().toISOString(),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "Remote",
        addressCountry: "BD",
      },
    },
    url: `${siteOrigin}/job/${job.slug}`,
  }));

  return (
    <div className="selection:bg-blue-500 selection:text-white">
      <Head>
        <title>{PAGE_TITLE}</title>

        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/predien.png" />

        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {unavailable && <meta name="robots" content="noindex, nofollow" />}

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
            __html: JSON.stringify(pageSchema),
          }}
        />

        {jobs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jobPostingSchema),
            }}
          />
        )}
      </Head>

      <Header />

      <section className="relative flex min-h-[82vh] items-center overflow-hidden bg-white pt-24 transition-colors duration-700 dark:bg-[#020617]">
        <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-20">
          <div className="absolute right-[-10%] top-[-10%] h-[640px] w-[640px] rounded-full bg-blue-600/30 blur-[150px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 lg:col-span-7"
            >
              <AnchorHeadingPage text="Join Our Crew" />

              <HeadingPage firstText="Build the" secondText="Future." />

              <SubHeadingPage text="Join a focused team building scalable software, automation systems, and future-ready digital products with clean engineering culture." />

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="#job-list"
                  className="inline-flex items-center gap-4 rounded-full bg-blue-600 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20"
                >
                  View Open Roles
                  <HiArrowLongDown className="text-xl" />
                </Link>

                <Link
                  href="#culture"
                  className="inline-flex items-center rounded-full border border-slate-200 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                >
                  Why Predien
                </Link>
              </div>

              <div className="grid max-w-xl grid-cols-3 gap-4 pt-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    {jobs.length}
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Open Roles
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    Growth
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Culture
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    Tech
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Driven
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative hidden lg:col-span-5 lg:block"
            >
              <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[44px] border border-slate-100 bg-slate-100 shadow-[0_50px_100px_-35px_rgba(15,23,42,0.35)] dark:border-white/10">
                <Image
                  src={CareerHero}
                  alt="Predien Careers"
                  priority
                  sizes="40vw"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-200">
                    Careers at Predien
                  </p>

                  <p className="mt-2 text-xl font-black leading-tight text-white">
                    Build practical systems, learn fast, and grow with a serious engineering team.
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-7 -top-7 h-full w-full rounded-[44px] border border-slate-200 dark:border-blue-500/20" />
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="culture"
        className="bg-slate-50 py-16 transition-colors duration-700 dark:bg-[#01040f]"
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
              Why Join Us
            </p>

            <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
              Built for serious growth
              <span className="text-blue-600 dark:text-blue-500">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <CareerBenefitCard
              icon={<FiCode />}
              title="Real Engineering"
              text="Work on scalable software, automation, and digital systems that solve practical business problems."
            />

            <CareerBenefitCard
              icon={<FiZap />}
              title="Fast Learning"
              text="Learn through real projects, sharp feedback, and a culture focused on execution over noise."
            />

            <CareerBenefitCard
              icon={<FiUsers />}
              title="Focused Team"
              text="Collaborate with a clean, modern, and performance-driven team that values ownership."
            />
          </div>
        </div>
      </section>

      <main
        id="job-list"
        className="scroll-mt-[90px] bg-white py-16 transition-colors duration-700 dark:bg-[#020617]"
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-8 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
                Open Opportunities
              </p>

              <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
                Available Positions
                <span className="text-blue-600 dark:text-blue-500">.</span>
              </h2>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              {jobs.length} Open Opportunities
            </p>
          </div>

          {unavailable && (
            <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-800">
              Jobs are temporarily unavailable because the API did not respond
              correctly. This page is not showing a fake empty job list.
            </div>
          )}

          {jobs.length > 0 ? (
            <div className="flex flex-col gap-5">
              {jobs.map((item, index) => (
                <JobCard key={getJobId(item, index)} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center dark:border-slate-800 dark:bg-[#090d16]">
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                No open positions right now
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                We are not hiring for a public role at this moment. Keep an eye
                on this page for future opportunities.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Career;

async function fetchJsonWithTimeout(url: string, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      throw new Error(`Invalid JSON response from ${url}`);
    }

    const json = await res.json();

    if (!res.ok) {
      throw new Error(`API failed: ${res.status}`);
    }

    return json;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFromPossibleUrls(paths: string[], baseUrls: string[]) {
  let lastError: unknown = null;

  for (const baseUrl of baseUrls) {
    for (const path of paths) {
      try {
        const finalUrl = `${cleanUrl(baseUrl)}${path}`;
        const json = await fetchJsonWithTimeout(finalUrl);

        return json;
      } catch (error) {
        lastError = error;
      }
    }
  }

  throw lastError;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;

  const forwardedHost = getHeaderValue(req.headers["x-forwarded-host"]);
  const host = forwardedHost || req.headers.host || "localhost:3000";

  const forwardedProto = getHeaderValue(req.headers["x-forwarded-proto"]);
  const protocol =
    forwardedProto ||
    (process.env.NODE_ENV === "production" ? "https" : "http");

  const requestBaseUrl = `${protocol}://${host}`;

  const siteUrl = cleanUrl(
    process.env.NEXT_PUBLIC_SITE_URL || requestBaseUrl,
  );

  const apiBaseUrl = cleanUrl(process.env.API_BASE_URL || requestBaseUrl);

  const possibleBaseUrls = Array.from(
    new Set(
      [
        apiBaseUrl,
        requestBaseUrl,
        process.env.NEXT_PUBLIC_SITE_URL
          ? cleanUrl(process.env.NEXT_PUBLIC_SITE_URL)
          : "",
      ].filter(Boolean),
    ),
  );

  const canonicalUrl = `${siteUrl}/career`;

  try {
    const jobsResponse = await fetchFromPossibleUrls(
      ["/api/jobs", "/api/jobs/"],
      possibleBaseUrls,
    );

    const jobs = removeDuplicateJobs(normalizeArray(jobsResponse));

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=600",
    );

    return {
      props: {
        data: jobs,
        canonicalUrl,
        unavailable: false,
      },
    };
  } catch {
    res.statusCode = 503;

    return {
      props: {
        data: [],
        canonicalUrl,
        unavailable: true,
      },
    };
  }
}