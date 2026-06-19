import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import type { GetServerSidePropsContext } from "next";

import blogHero from "@/assets/blog.jpg";

import {
  FiArrowRight,
  FiBookOpen,
  FiClock,
  FiGrid,
  FiSearch,
} from "react-icons/fi";

type BlogItem = {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  image?: string;
  excerpt?: string;
  meta?: {
    title?: string;
    description?: string;
  };
  topic?: {
    _id?: string;
    id?: string;
    name?: string;
    slug?: string;
  };
  category?: {
    _id?: string;
    id?: string;
    name?: string;
    slug?: string;
  };
  topicSlug?: string;
  categorySlug?: string;
  datetime?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
};

type CategoryData = {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description?: string;
};

type CategoryPageProps = {
  data: BlogItem[];
  category: CategoryData;
  canonicalUrl: string;
  unavailable?: boolean;
};

const SITE_NAME = "Predien";

function cleanUrl(url: string) {
  return url.replace(/\/$/, "");
}

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function normalizeArray(value: any): any[] {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.blogs)) return value.blogs;
  if (Array.isArray(value?.posts)) return value.posts;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.result)) return value.result;

  return [];
}

function normalizeObject(value: any) {
  if (!value) return null;

  if (!Array.isArray(value) && typeof value === "object") {
    if (value.data && !Array.isArray(value.data)) return value.data;
    if (value.category && !Array.isArray(value.category)) return value.category;
    if (value.topic && !Array.isArray(value.topic)) return value.topic;
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }

  return null;
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function slugifyText(value?: string) {
  if (!value) return "";

  return value
    .toString()
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getBlogDate(item: BlogItem) {
  return item.datetime || item.date || item.createdAt || item.updatedAt || "";
}

function formatDate(date?: string) {
  if (!date) return "Latest";

  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "Latest";
  }
}

function getBlogImage(item: BlogItem): string | StaticImageData {
  return item.image || blogHero;
}

function getBlogId(item: BlogItem, index: number) {
  return item._id || item.id || item.slug || String(index);
}

function removeDuplicatePosts(posts: BlogItem[]) {
  const seen = new Set<string>();

  return posts.filter((post) => {
    if (!post?.title || !post?.slug) return false;

    if (seen.has(post.slug)) return false;

    seen.add(post.slug);
    return true;
  });
}

function blogMatchesCategory(post: BlogItem, categorySlug: string) {
  const target = slugifyText(categorySlug);

  const possibleValues = [
    post.topic?.slug,
    post.topic?.name,
    post.topic?._id,
    post.topic?.id,
    post.category?.slug,
    post.category?.name,
    post.category?._id,
    post.category?.id,
    post.topicSlug,
    post.categorySlug,
  ];

  return possibleValues.some((value) => slugifyText(value) === target);
}

function makeAbsoluteUrl(url: string | undefined, siteOrigin: string) {
  if (!url) return `${siteOrigin}/blog-og.jpg`;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${siteOrigin}${url}`;
  }

  return `${siteOrigin}/${url}`;
}

function BlogCard({ item, index }: { item: BlogItem; index: number }) {
  const image = getBlogImage(item);
  const date = formatDate(getBlogDate(item));
  const categoryName =
    item.topic?.name || item.category?.name || item.categorySlug || "Insight";

  return (
    <article className="group">
      <Link
        href={`/blog/${item.slug}`}
        aria-label={`Read ${item.title}`}
        className="block h-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-950"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
          <Image
            src={image}
            alt={item.title}
            fill={typeof image === "string"}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

          <div className="absolute left-4 top-4">
            <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-white backdrop-blur-md">
              {categoryName}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
            <FiClock className="text-blue-600 dark:text-blue-500" />
            <span>{date}</span>
          </div>

          <h2 className="line-clamp-2 text-xl font-black leading-tight tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-500">
            {item.title}
          </h2>

          {item.excerpt && (
            <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              {item.excerpt}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500">
              Read Article
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white transition-all duration-300 group-hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
              <FiArrowRight />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function BlogCategoryPage({
  data,
  category,
  canonicalUrl,
  unavailable = false,
}: CategoryPageProps) {
  const posts = removeDuplicatePosts(data || []);

  const siteOrigin = (() => {
    try {
      return new URL(canonicalUrl).origin;
    } catch {
      return "https://predien.vercel.app";
    }
  })();

  const categoryName = category?.name || titleFromSlug(category.slug);
  const categoryDescription =
    category?.description ||
    `Explore ${categoryName} articles, technical guides, software insights, and practical engineering ideas from Predien.`;

  const pageTitle = `${categoryName} Articles | Predien Engineering Journal`;
  const ogImage = makeAbsoluteUrl("/blog-og.jpg", siteOrigin);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: categoryDescription,
    url: canonicalUrl,
    isPartOf: {
      "@type": "Blog",
      name: "Predien Engineering Journal",
      url: `${siteOrigin}/blog`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${siteOrigin}/predien.png`,
      },
    },
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
        name: "Blog",
        item: `${siteOrigin}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="bg-white selection:bg-blue-500 selection:text-white dark:bg-[#020617]">
      <Head>
        <title>{pageTitle}</title>

        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/predien.png" />

        <meta name="description" content={categoryDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {unavailable && <meta name="robots" content="noindex, nofollow" />}

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={categoryDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={categoryDescription} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collectionSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>

      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-28 dark:border-slate-900 dark:bg-[#020617]">
          <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-20">
            <div className="absolute right-[-10%] top-[-20%] h-[620px] w-[620px] rounded-full bg-blue-600/30 blur-[150px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-14 md:px-8">
            <Link
              href="/blog"
              className="group mb-10 inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all hover:text-blue-600"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all group-hover:border-blue-600 group-hover:bg-blue-600 dark:border-slate-800">
                <FiArrowRight className="rotate-180 text-lg transition-colors group-hover:text-white" />
              </span>
              Back to Blog
            </Link>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  <FiGrid />
                  Blog Category
                </div>

                <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tight text-slate-950 dark:text-white md:text-6xl">
                  {categoryName}
                  <span className="text-blue-600 dark:text-blue-500">.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">
                  {categoryDescription}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#articles"
                    className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20"
                  >
                    Explore Articles
                    <FiArrowRight />
                  </a>

                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-3 rounded-full border border-slate-200 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                  >
                    All Journals
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Category Summary
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white p-4 dark:bg-[#090d16]">
                      <p className="text-2xl font-black text-slate-950 dark:text-white">
                        {posts.length}
                      </p>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Articles
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 dark:bg-[#090d16]">
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
            </div>
          </div>
        </section>

        <section
          id="articles"
          className="scroll-mt-[100px] bg-slate-50 py-16 dark:bg-[#01040f]"
        >
          <div className="mx-auto max-w-[1400px] px-6 md:px-8">
            <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-8 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
                  Curated Articles
                </p>

                <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
                  Latest in {categoryName}
                  <span className="text-blue-600 dark:text-blue-500">.</span>
                </h2>
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                {posts.length} Publications
              </p>
            </div>

            {unavailable && (
              <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-800">
                Articles are temporarily unavailable because the API did not
                respond correctly. This page is not showing a fake empty list.
              </div>
            )}

            {posts.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 md:gap-5 md:grid-cols-3 xl:grid-cols-4">
                {posts.map((item, index) => (
                  <BlogCard key={getBlogId(item, index)} item={item} index={index} />
                ))}
              </div>
            ) : (
              <div className="rounded-[32px] border border-dashed border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-[#090d16]">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  <FiSearch />
                </div>

                <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                  No articles found
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                  No published articles are available under {categoryName} yet.
                  Explore all journal posts instead.
                </p>

                <Link
                  href="/blog"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
                >
                  Explore All Blogs
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-[#020617]">
          <div className="mx-auto max-w-[1200px] px-6 text-center md:px-8">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <FiBookOpen />
            </div>

            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
              Keep Learning
            </p>

            <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
              Explore more engineering insights
              <span className="text-blue-600 dark:text-blue-500">.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Browse all Predien journal articles to discover more technical
              guides, architecture ideas, and digital product insights.
            </p>

            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20"
              >
                Visit Engineering Journal
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

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

async function fetchCategoryBlogs(categorySlug: string, baseUrls: string[]) {
  try {
    const directResponse = await fetchFromPossibleUrls(
      [
        `/api/blogs?topic=${encodeURIComponent(categorySlug)}`,
        `/api/blogs?category=${encodeURIComponent(categorySlug)}`,
        `/api/blogs/category/${encodeURIComponent(categorySlug)}`,
        `/api/blogs/topic/${encodeURIComponent(categorySlug)}`,
      ],
      baseUrls,
    );

    return removeDuplicatePosts(normalizeArray(directResponse));
  } catch {
    const allBlogsResponse = await fetchFromPossibleUrls(["/api/blogs", "/api/blogs/"], baseUrls);

    const allBlogs = normalizeArray(allBlogsResponse);

    return removeDuplicatePosts(
      allBlogs.filter((post) => blogMatchesCategory(post, categorySlug)),
    );
  }
}

async function fetchCategoryData(categorySlug: string, baseUrls: string[]) {
  try {
    const categoryResponse = await fetchFromPossibleUrls(
      [
        `/api/topics/${encodeURIComponent(categorySlug)}`,
        `/api/topic/${encodeURIComponent(categorySlug)}`,
        `/api/categories/${encodeURIComponent(categorySlug)}`,
        `/api/category/${encodeURIComponent(categorySlug)}`,
        `/api/topics?slug=${encodeURIComponent(categorySlug)}`,
        `/api/categories?slug=${encodeURIComponent(categorySlug)}`,
      ],
      baseUrls,
    );

    const categoryObject = normalizeObject(categoryResponse);

    if (categoryObject?.name) {
      return {
        _id: categoryObject._id || categoryObject.id || "",
        name: categoryObject.name,
        slug: categoryObject.slug || categorySlug,
        description: categoryObject.description || "",
      };
    }
  } catch {}

  return {
    name: titleFromSlug(categorySlug),
    slug: categorySlug,
    description: "",
  };
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

  const siteUrl = cleanUrl(process.env.NEXT_PUBLIC_SITE_URL || requestBaseUrl);
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

  const canonicalUrl = `${siteUrl}/blog/category/${slug}`;

  try {
    const [blogs, category] = await Promise.all([
      fetchCategoryBlogs(slug, possibleBaseUrls),
      fetchCategoryData(slug, possibleBaseUrls),
    ]);

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=600",
    );

    return {
      props: {
        data: blogs,
        category,
        canonicalUrl,
        unavailable: false,
      },
    };
  } catch {
    res.statusCode = 503;

    return {
      props: {
        data: [],
        category: {
          name: titleFromSlug(slug),
          slug,
          description: "",
        },
        canonicalUrl,
        unavailable: true,
      },
    };
  }
}