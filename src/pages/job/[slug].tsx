import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { slateToHtml } from "@/components/slatetoHtml";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import React, { useMemo } from "react";

import { GoArrowLeft } from "react-icons/go";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiUsers,
  FiZap,
} from "react-icons/fi";

type CareerViewProps = {
  data: any | null;
  canonicalUrl: string;
  unavailable?: boolean;
};

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function cleanUrl(url: string) {
  return url.replace(/\/$/, "");
}

function safeJsonParse(value: any) {
  try {
    if (!value) return [];

    if (Array.isArray(value)) return value;

    const parsed = typeof value === "string" ? JSON.parse(value) : value;

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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

function formatDate(date?: string) {
  if (!date) return new Date().toISOString();

  try {
    return new Date(date).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function getJobTitle(data: any) {
  return data?.job_title || data?.title || "Career Opportunity";
}

function getJobDescription(data: any) {
  return (
    data?.meta?.description ||
    data?.short_description ||
    data?.excerpt ||
    `Apply for ${getJobTitle(data)} at Predien and join a modern engineering team building scalable digital products.`
  );
}

function getEmploymentType(duration?: string) {
  if (!duration) return "FULL_TIME";

  const lower = duration.toLowerCase();

  if (lower.includes("part")) return "PART_TIME";
  if (lower.includes("contract")) return "CONTRACTOR";
  if (lower.includes("intern")) return "INTERN";
  if (lower.includes("freelance")) return "CONTRACTOR";

  return "FULL_TIME";
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
}) {
  if (!value) return null;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          {icon}
        </div>

        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>

      <span className="text-right text-sm font-black text-slate-950 dark:text-white">
        {value}
      </span>
    </div>
  );
}

function CareerView({
  data,
  canonicalUrl,
  unavailable = false,
}: CareerViewProps) {
  const router = useRouter();

  const siteOrigin = useMemo(() => {
    try {
      return new URL(canonicalUrl).origin;
    } catch {
      return "https://predien.vercel.app";
    }
  }, [canonicalUrl]);

  const serializeToHtml = useMemo(() => {
    if (!data?.description) return "";

    try {
      const parsedData = safeJsonParse(data.description);
      return slateToHtml(parsedData);
    } catch {
      return "";
    }
  }, [data?.description]);

  if (unavailable || !data) {
    return (
      <>
        <Head>
          <title>Job Temporarily Unavailable | Predien</title>
          <meta
            name="description"
            content="This job page is temporarily unavailable."
          />
          <meta name="robots" content="noindex, nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href={canonicalUrl} />
          <link rel="icon" href="/predien.png" />
        </Head>

        <div className="min-h-screen bg-white selection:bg-blue-500 selection:text-white dark:bg-[#020617]">
          <Header />

          <main className="flex min-h-[70vh] items-center justify-center px-6">
            <div className="max-w-xl text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <FiBriefcase />
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                Job Temporarily Unavailable
              </h1>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                We could not load this job right now. Please try again later or
                explore other openings.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => router.push("/job")}
                  className="inline-flex items-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
                >
                  <GoArrowLeft />
                  Back to Jobs
                </button>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full border border-slate-200 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                >
                  Contact Predien
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </>
    );
  }

  const jobTitle = getJobTitle(data);
  const pageDescription = getJobDescription(data);

  const pageTitle = data?.meta?.title
    ? `Predien | ${data.meta.title}`
    : `Predien Careers | ${jobTitle}`;

  const imageUrl = makeAbsoluteUrl("/career-og.jpg", siteOrigin);

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: jobTitle,
    description: pageDescription,
    datePosted: formatDate(data?.createdAt || data?.date),
    validThrough: data?.deadline
      ? formatDate(data.deadline)
      : undefined,
    employmentType: getEmploymentType(data?.duration),
    hiringOrganization: {
      "@type": "Organization",
      name: "Predien",
      sameAs: siteOrigin,
      logo: `${siteOrigin}/predien.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: data?.location || "Remote",
        addressCountry: "BD",
      },
    },
    baseSalary: data?.salary_range
      ? {
          "@type": "MonetaryAmount",
          currency: "BDT",
          value: {
            "@type": "QuantitativeValue",
            value: data.salary_range,
            unitText: "MONTH",
          },
        }
      : undefined,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Bangladesh",
    },
    url: canonicalUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteOrigin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Careers",
        item: `${siteOrigin}/career`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: jobTitle,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>

        <link rel="icon" href="/predien.png" />
        <link rel="canonical" href={canonicalUrl} />

        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>

      <div className="bg-white selection:bg-blue-500 selection:text-white dark:bg-[#020617]">
        <Header />

        <main>
          <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-28 dark:border-slate-900 dark:bg-[#020617]">
            <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-20">
              <div className="absolute right-[-10%] top-[-20%] h-[620px] w-[620px] rounded-full bg-blue-600/30 blur-[150px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-14 md:px-8">
              <button
                onClick={() => router.push("/job")}
                className="group mb-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all hover:text-blue-600"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all group-hover:border-blue-600 group-hover:bg-blue-600 dark:border-slate-800">
                  <GoArrowLeft className="text-lg transition-colors group-hover:text-white" />
                </span>
                Back to Jobs
              </button>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <div className="mb-5 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                      <FiBriefcase />
                      {data?.duration || "Full Time"}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <FiMapPin />
                      {data?.location || "Remote / On-site"}
                    </span>
                  </div>

                  <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tight text-slate-950 dark:text-white md:text-6xl">
                    {jobTitle}
                  </h1>

                  <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">
                    {pageDescription}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/job/apply/${data?.slug}`}
                      className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20"
                    >
                      Apply Now
                      <FiArrowRight />
                    </Link>

                    <a
                      href="#details"
                      className="inline-flex items-center gap-3 rounded-full border border-slate-200 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                    >
                      View Job Details
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      Job Summary
                    </p>

                    <div className="mt-5 space-y-4">
                      <InfoRow
                        icon={<FiBriefcase />}
                        label="Nature"
                        value={data?.duration}
                      />

                      <InfoRow
                        icon={<FiMapPin />}
                        label="Location"
                        value={data?.location}
                      />

                      <InfoRow
                        icon={<FiDollarSign />}
                        label="Salary"
                        value={data?.salary_range}
                      />

                      <InfoRow
                        icon={<FiUsers />}
                        label="Vacancy"
                        value={data?.vacancy}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="details"
            className="scroll-mt-[100px] bg-slate-50 py-14 dark:bg-[#01040f]"
          >
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 md:px-8 lg:grid-cols-12">
              <article className="lg:col-span-8">
                <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#090d16] md:p-10">
                  <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
                      Role Details
                    </p>

                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                      What you need to know
                    </h2>
                  </div>

                  {serializeToHtml ? (
                    <div
                      className="prose prose-lg max-w-none prose-slate
                      prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-950
                      prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed
                      prose-strong:text-blue-600
                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                      prose-li:text-slate-600 prose-li:font-medium
                      dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-slate-400 dark:prose-strong:text-blue-400 dark:prose-li:text-slate-400"
                      dangerouslySetInnerHTML={{ __html: serializeToHtml }}
                    />
                  ) : (
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Job details will be updated soon.
                    </p>
                  )}
                </div>
              </article>

              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-5">
                  <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm dark:border-slate-800 dark:bg-white dark:text-slate-950">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl text-white">
                      <FiZap />
                    </div>

                    <h3 className="text-xl font-black tracking-tight">
                      Ready to join Predien?
                    </h3>

                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-300 dark:text-slate-600">
                      Submit your application and show us how you can contribute
                      to our engineering team.
                    </p>

                    <Link
                      href={`/job/apply/${data?.slug}`}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition-all hover:bg-blue-700"
                    >
                      Apply for this role
                      <FiArrowRight />
                    </Link>
                  </div>

                  <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#090d16]">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
                      Hiring Process
                    </h3>

                    <div className="mt-5 space-y-4">
                      <div className="flex gap-3">
                        <FiCheckCircle className="mt-1 shrink-0 text-blue-600" />
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Submit your application
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <FiClock className="mt-1 shrink-0 text-blue-600" />
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Shortlisted candidates will be contacted
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <FiBriefcase className="mt-1 shrink-0 text-blue-600" />
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Interview and final selection
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default CareerView;

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
        return await fetchJsonWithTimeout(`${cleanUrl(baseUrl)}${path}`);
      } catch (error) {
        lastError = error;
      }
    }
  }

  throw lastError;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req, res } = context;

  const slug = params?.slug;

  if (!slug || typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

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

  const canonicalUrl = `${siteUrl}/career/${slug}`;

  try {
    const job = await fetchFromPossibleUrls(
      [
        `/api/jobs/${encodeURIComponent(slug)}`,
        `/api/jobs/${encodeURIComponent(slug)}/`,
      ],
      possibleBaseUrls,
    );

    if (!job || (!job.job_title && !job.title)) {
      return {
        notFound: true,
      };
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=600",
    );

    return {
      props: {
        data: job,
        canonicalUrl,
        unavailable: false,
      },
    };
  } catch {
    res.statusCode = 503;

    return {
      props: {
        data: null,
        canonicalUrl,
        unavailable: true,
      },
    };
  }
}