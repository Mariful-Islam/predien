import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import type { GetServerSidePropsContext } from "next";

import { HiArrowLongDown } from "react-icons/hi2";
import {
  FiArrowRight,
  FiBox,
  FiCode,
  FiCpu,
  FiShield,
  FiZap,
} from "react-icons/fi";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/admin/product/ProductGrid";
import AnchorHeadingPage from "@/components/global/AnchorHeadingPage";
import HeadingPage from "@/components/global/HeadingPage";
import SubHeadingPage from "@/components/global/SubHeadingPage";

import ProductHero from "@/assets/product.png";

type ProductItem = {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  product_name?: string;
  slug?: string;
  description?: string;
  image?: string;
  price?: string | number;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
};

interface ProductProps {
  data: ProductItem[];
  canonicalUrl: string;
  unavailable?: boolean;
}

const SITE_NAME = "Predien";

const PAGE_TITLE = "Predien Products | Software, SaaS & Automation Systems";

const PAGE_DESCRIPTION =
  "Explore Predien products, software systems, automation tools, SaaS applications, and production-ready digital solutions built for scalable businesses.";

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function cleanUrl(url: string) {
  return url.replace(/\/$/, "");
}

function normalizeArray(value: any): ProductItem[] {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.products)) return value.products;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.result)) return value.result;

  return [];
}

function getProductTitle(product: ProductItem) {
  return (
    product.title ||
    product.name ||
    product.product_name ||
    "Predien Product"
  );
}

function getProductSlug(product: ProductItem) {
  return product.slug || product._id || product.id || "";
}

function getProductId(product: ProductItem, index: number) {
  return product._id || product.id || product.slug || String(index);
}

function removeDuplicateProducts(products: ProductItem[]) {
  const seen = new Set<string>();

  return products.filter((product) => {
    const title = getProductTitle(product);
    const slug = getProductSlug(product);

    if (!title || !slug) return false;

    const key = slug || title;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function makeAbsoluteUrl(url: string | undefined, siteOrigin: string) {
  if (!url) return `${siteOrigin}/product-og.jpg`;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${siteOrigin}${url}`;
  }

  return `${siteOrigin}/${url}`;
}

function FeatureCard({
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

const Product: React.FC<ProductProps> = ({
  data,
  canonicalUrl,
  unavailable = false,
}) => {
  const products = useMemo(() => removeDuplicateProducts(data || []), [data]);

  const siteOrigin = useMemo(() => {
    try {
      return new URL(canonicalUrl).origin;
    } catch {
      return "https://predien.vercel.app";
    }
  }, [canonicalUrl]);

  const ogImage = makeAbsoluteUrl("/product-og.jpg", siteOrigin);

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

  const productSchema = products.map((product) => {
    const title = getProductTitle(product);
    const slug = getProductSlug(product);

    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: title,
      description:
        product.description ||
        `${title} is a production-ready software solution by Predien.`,
      applicationCategory: product.category || "BusinessApplication",
      operatingSystem: "Web",
      url: slug ? `${siteOrigin}/product/${slug}` : canonicalUrl,
      image: makeAbsoluteUrl(product.image, siteOrigin),
      offers: product.price
        ? {
            "@type": "Offer",
            price: String(product.price),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          }
        : undefined,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    };
  });

  return (
    <div className="bg-white selection:bg-blue-500 selection:text-white dark:bg-[#020617]">
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

        {products.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(productSchema),
            }}
          />
        )}
      </Head>

      <Header />

      <section className="relative flex min-h-[84vh] items-center overflow-hidden bg-white pt-24 transition-colors duration-700 dark:bg-[#020617]">
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
              <AnchorHeadingPage text="Production Ecosystem" />

              <HeadingPage firstText="Engineered" secondText="Solutions." />

              <SubHeadingPage text="Explore production-ready software, automation systems, SaaS applications, and developer tools engineered to help businesses move faster." />

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="#products"
                  className="inline-flex items-center gap-4 rounded-full bg-blue-600 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20"
                >
                  Explore Products
                  <HiArrowLongDown className="text-xl" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full border border-slate-200 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                >
                  Request Custom Build
                  <FiArrowRight />
                </Link>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    {products.length}
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Active Builds
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    SaaS
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Ready Systems
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    API
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Scalable Stack
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
                  src={ProductHero}
                  alt="Predien software product ecosystem"
                  priority
                  sizes="40vw"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-200">
                    Product Lab
                  </p>

                  <p className="mt-2 text-xl font-black leading-tight text-white">
                    Tools and systems built for real business execution.
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-7 -top-7 h-full w-full rounded-[44px] border border-slate-200 dark:border-blue-500/20" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 transition-colors duration-700 dark:bg-[#01040f]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
              Why Our Products
            </p>

            <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
              Built for speed, scale, and conversion
              <span className="text-blue-600 dark:text-blue-500">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<FiZap />}
              title="Fast Deployment"
              text="Production-ready systems designed to launch faster, reduce manual work, and create measurable business value."
            />

            <FeatureCard
              icon={<FiCode />}
              title="Clean Architecture"
              text="Built with scalable engineering patterns, clean interfaces, and maintainable code foundations."
            />

            <FeatureCard
              icon={<FiShield />}
              title="Business Reliability"
              text="Focused on stability, performance, and real-world usage instead of just visual presentation."
            />
          </div>
        </div>
      </section>

      <main
        id="products"
        className="scroll-mt-[90px] bg-white py-16 transition-colors duration-700 dark:bg-[#020617]"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-8">
          <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-8 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
                Product Library
              </p>

              <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
                Active Builds
                <span className="text-blue-600 dark:text-blue-500">.</span>
              </h2>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              {products.length} Ships Released
            </p>
          </div>

          {unavailable && (
            <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-800">
              Products are temporarily unavailable because the API did not
              respond correctly. This page is not showing a fake empty product
              list.
            </div>
          )}

          {products.length > 0 ? (
            <ProductGrid data={products as any} />
          ) : (
            <div className="rounded-[32px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center dark:border-slate-800 dark:bg-[#090d16]">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <FiBox />
              </div>

              <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                No products available right now
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                Our product library is being updated. You can still request a
                custom software system based on your business needs.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
              >
                Request Custom Build
              </Link>
            </div>
          )}
        </div>
      </main>

      <section className="bg-slate-50 py-16 transition-colors duration-700 dark:bg-[#01040f]">
        <div className="mx-auto max-w-[1200px] px-6 text-center md:px-8">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
            Need Something Specific?
          </p>

          <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
            Build a custom product around your workflow
            <span className="text-blue-600 dark:text-blue-500">.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400">
            From internal dashboards to automation platforms, Predien can build
            a tailored software system for your exact business process.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20"
            >
              Talk to Predien
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Product;

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

  const canonicalUrl = `${siteUrl}/product`;

  try {
    const productsResponse = await fetchFromPossibleUrls(
      ["/api/products", "/api/products/"],
      possibleBaseUrls,
    );

    const products = removeDuplicateProducts(normalizeArray(productsResponse));

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=600",
    );

    return {
      props: {
        data: products,
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