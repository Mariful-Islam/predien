import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useTopicContext } from "@/context/TopicContext";
import Head from "next/head";
import Link from "next/link";
import type { GetServerSidePropsContext } from "next";
import React, { useMemo } from "react";
import {
  FiArrowRight,
  FiBookOpen,
  FiGrid,
  FiLayers,
  FiSearch,
} from "react-icons/fi";

type TopicItem = {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  short_description?: string;
  articleCount?: number;
  count?: number;
};

type BlogCategoryHubProps = {
  initialTopics: TopicItem[];
  canonicalUrl: string;
  unavailable?: boolean;
};

const PAGE_TITLE = "Explore Engineering Topics | Predien Journal";

const PAGE_DESCRIPTION =
  "Explore Predien engineering topics, including software architecture, scalable automation, UI/UX, SaaS, development systems, and digital product strategy.";

function getHeaderValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function cleanUrl(url: string) {
  return url.replace(/\/$/, "");
}

function createSlug(value: string) {
  return value
    .toString()
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeTopics(value: any): TopicItem[] {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.topics)) return value.topics;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.result)) return value.result;

  return [];
}

function removeDuplicateTopics(topics: TopicItem[]) {
  const seen = new Set<string>();

  return topics.filter((topic) => {
    if (!topic?.name) return false;

    const key = topic.slug || createSlug(topic.name);

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function getTopicId(topic: TopicItem, index: number) {
  return topic._id || topic.id || topic.slug || String(index);
}

function getTopicUrl(topic: TopicItem) {
  const slug = topic.slug || createSlug(topic.name);

  return `/blog/category/${encodeURIComponent(slug)}`;
}

function getTopicDescription(topic: TopicItem) {
  return (
    topic.short_description ||
    `Read focused articles, practical guides, and technical insights about ${topic.name}.`
  );
}

async function fetchJsonWithTimeout(url: string, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Topics API failed with ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

export default function BlogCategoryHub({
  initialTopics,
  canonicalUrl,
  unavailable = false,
}: BlogCategoryHubProps) {
  const { topics: contextTopics = [] } = useTopicContext();

  const topics = useMemo(() => {
    const sourceTopics =
      initialTopics?.length > 0 ? initialTopics : contextTopics;

    return removeDuplicateTopics(sourceTopics || []);
  }, [initialTopics, contextTopics]);

  const siteOrigin = useMemo(() => {
    try {
      return new URL(canonicalUrl).origin;
    } catch {
      return "https://predien.vercel.app";
    }
  }, [canonicalUrl]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: canonicalUrl,
    isPartOf: {
      "@type": "Blog",
      name: "Predien Engineering Journal",
      url: `${siteOrigin}/blog`,
    },
    publisher: {
      "@type": "Organization",
      name: "Predien",
      logo: {
        "@type": "ImageObject",
        url: `${siteOrigin}/predien.png`,
      },
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Predien Blog Topics",
    numberOfItems: topics.length,
    itemListElement: topics.map((topic, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: topic.name,
      url: `${siteOrigin}${getTopicUrl(topic)}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-500 selection:text-white dark:bg-[#020617]">
      <Head>
        <title>{PAGE_TITLE}</title>

        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/predien.png" />

        {unavailable && <meta name="robots" content="noindex, nofollow" />}

        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${siteOrigin}/blog-og.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={`${siteOrigin}/blog-og.jpg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collectionSchema),
          }}
        />

        {topics.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(itemListSchema),
            }}
          />
        )}
      </Head>

      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-28 dark:border-slate-900 dark:bg-[#020617]">
          <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-20">
            <div className="absolute right-[-10%] top-[-20%] h-[620px] w-[620px] rounded-full bg-blue-600/30 blur-[150px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-16 md:px-8">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <FiBookOpen />
                Predien Engineering Journal
              </div>

              <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tight text-slate-950 dark:text-white md:text-6xl">
                Find the insight your product needs
                <span className="text-blue-600 dark:text-blue-500">.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">
                Browse practical engineering knowledge around software
                architecture, product design, automation, scalability, SaaS,
                and modern digital systems.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#topics"
                  className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20"
                >
                  Explore Topics
                  <FiArrowRight />
                </a>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-3 rounded-full border border-slate-200 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                >
                  View All Articles
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    {topics.length}
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Topics
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    Tech
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Focused
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    SEO
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Ready
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topic Cards */}
        <section
          id="topics"
          className="scroll-mt-[100px] bg-slate-50 py-16 dark:bg-[#01040f]"
        >
          <div className="mx-auto max-w-[1400px] px-6 md:px-8">
            <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-8 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
                  Explore by Topic
                </p>

                <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
                  Choose your focus
                  <span className="text-blue-600 dark:text-blue-500">.</span>
                </h2>
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
                {topics.length} Knowledge Categories
              </p>
            </div>

            {unavailable && (
              <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-800">
                Topics are temporarily unavailable because the API did not
                respond correctly. Please refresh the page shortly.
              </div>
            )}

            {topics.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {topics.map((topic, index) => {
                  const articleCount =
                    topic.articleCount || topic.count || null;

                  return (
                    <Link
                      href={getTopicUrl(topic)}
                      key={getTopicId(topic, index)}
                      className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-950"
                    >
                      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40 dark:text-blue-400">
                            <FiLayers />
                          </div>

                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-slate-800">
                            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                          </div>
                        </div>

                        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                          Topic
                        </p>

                        <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-500">
                          {topic.name}
                        </h3>

                        <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                          {getTopicDescription(topic)}
                        </p>
                      </div>

                      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500">
                          Explore Articles
                        </span>

                        {articleCount !== null && (
                          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                            {articleCount} Posts
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-[32px] border border-dashed border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-[#090d16]">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  <FiSearch />
                </div>

                <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                  No topics available yet
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                  New knowledge categories will appear here as articles are
                  published in the Predien Engineering Journal.
                </p>

                <Link
                  href="/blog"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
                >
                  Browse All Articles
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
) {
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

  const baseUrls = Array.from(
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

  const canonicalUrl = `${siteUrl}/blog/category`;

  try {
    let topicsResponse: any = null;
    let lastError: unknown = null;

    for (const baseUrl of baseUrls) {
      for (const endpoint of ["/api/topics", "/api/topics/", "/api/topic"]) {
        try {
          topicsResponse = await fetchJsonWithTimeout(
            `${cleanUrl(baseUrl)}${endpoint}`,
          );

          break;
        } catch (error) {
          lastError = error;
        }
      }

      if (topicsResponse) break;
    }

    if (!topicsResponse) {
      throw lastError || new Error("Topics API unavailable");
    }

    const topics = removeDuplicateTopics(normalizeTopics(topicsResponse));

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=600",
    );

    return {
      props: {
        initialTopics: topics,
        canonicalUrl,
        unavailable: false,
      },
    };
  } catch {
    res.statusCode = 503;

    return {
      props: {
        initialTopics: [],
        canonicalUrl,
        unavailable: true,
      },
    };
  }
}