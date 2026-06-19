import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import type { GetServerSidePropsContext } from "next";

import { GoArrowLeft } from "react-icons/go";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiLink,
  FiUser,
  FiFileText,
  FiShield,
} from "react-icons/fi";

import { toast } from "react-toastify";

type ApplyProps = {
  slug: string;
  canonicalUrl: string;
};

type FormDataState = {
  candidate_name: string;
  candidate_email: string;
  candidate_phone: string;
  portfolio_link: string;
  resume_link: string;
  text: string;
  website: string; // honeypot field
};

const initialFormData: FormDataState = {
  candidate_name: "",
  candidate_email: "",
  candidate_phone: "",
  portfolio_link: "",
  resume_link: "",
  text: "",
  website: "",
};

function cleanUrl(url: string) {
  return url.replace(/\/$/, "");
}

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function formatTitleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function Apply({ slug, canonicalUrl }: ApplyProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [confirmation, setConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTitle = useMemo(() => formatTitleFromSlug(slug), [slug]);

  const pageTitle = `Apply for ${jobTitle} | Predien Careers`;
  const pageDescription = `Submit your application for ${jobTitle} at Predien. Share your contact details, CV link, portfolio, and cover letter.`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    if (formData.website) {
      return;
    }

    if (!formData.candidate_name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!isValidEmail(formData.candidate_email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!formData.candidate_phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!formData.resume_link.trim()) {
      toast.error("Please add your resume/CV link.");
      return;
    }

    if (!formData.text.trim()) {
      toast.error("Please write a short cover letter.");
      return;
    }

    const subject = `Application for ${jobTitle}`;

    const text = [
      `Job Position: ${jobTitle}`,
      `Candidate Name: ${formData.candidate_name}`,
      `Email: ${formData.candidate_email}`,
      `Phone Number: ${formData.candidate_phone}`,
      `Resume/CV Link: ${formData.resume_link}`,
      `Portfolio/GitHub/LinkedIn: ${formData.portfolio_link || "Not provided"}`,
      "",
      "Cover Letter:",
      formData.text,
    ].join("\n");

    const payload = {
      subject,
      text,
      candidate_name: formData.candidate_name,
      candidate_email: formData.candidate_email,
      candidate_phone: formData.candidate_phone,
      resume_link: formData.resume_link,
      portfolio_link: formData.portfolio_link,
      job_slug: slug,
      job_title: jobTitle,
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/apply/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Application request failed");
      }

      setConfirmation(true);
      setFormData(initialFormData);
      toast.success("Application submitted successfully.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white selection:bg-blue-500 selection:text-white dark:bg-[#020617]">
      <Head>
        <title>{pageTitle}</title>

        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/predien.png" />

        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Apply pages should usually not be indexed */}
        <meta name="robots" content="noindex, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>

      <Header />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-20">
          <div className="absolute right-[-10%] top-[-10%] h-[620px] w-[620px] rounded-full bg-blue-600/30 blur-[150px]" />
        </div>

        <section className="relative z-10 mx-auto max-w-[1200px] px-6 pb-20 pt-28 md:px-8">
          <button
            onClick={() => router.back()}
            className="group mb-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all hover:text-blue-600"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all group-hover:border-blue-600 group-hover:bg-blue-600 dark:border-slate-800">
              <GoArrowLeft className="text-lg transition-colors group-hover:text-white" />
            </span>
            Back
          </button>

          {confirmation ? (
            <div className="mx-auto max-w-2xl rounded-[36px] border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-[#090d16] md:p-12">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-3xl text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <FiCheckCircle />
              </div>

              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400">
                Application Submitted
              </p>

              <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
                Thank you for applying.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                Your application for{" "}
                <span className="font-black text-slate-950 dark:text-white">
                  {jobTitle}
                </span>{" "}
                has been submitted. If your profile matches the role, the
                Predien team will contact you.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/career"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
                >
                  View More Jobs
                  <FiArrowRight />
                </Link>

                <button
                  onClick={() => setConfirmation(false)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="sticky top-28">
                  <div className="rounded-[36px] border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-[#090d16] md:p-8">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
                      <FiBriefcase />
                    </div>

                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400">
                      Career Application
                    </p>

                    <h1 className="text-xl font-black leading-[0.95] tracking-tight text-slate-950 dark:text-white md:text-2xl">
                      Apply for {jobTitle}
                    </h1>

                    <p className="mt-5 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                      Share your contact details, CV link, and a short note
                      about why you are a good fit. Keep it clear and specific.
                    </p>

                    <div className="mt-8 space-y-4">
                      <div className="flex items-start gap-3">
                        <FiCheckCircle className="mt-1 shrink-0 text-blue-600" />
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Use a public Google Drive, Dropbox, or LinkedIn resume
                          link.
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiShield className="mt-1 shrink-0 text-blue-600" />
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Your information will only be used for recruitment
                          review.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <form
                  onSubmit={handleApply}
                  className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#090d16] md:p-8"
                >
                  <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400">
                      Candidate Details
                    </p>

                    <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                      Submit your application
                    </h2>
                  </div>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                        <FiUser />
                        Full Name
                      </span>

                      <input
                        type="text"
                        name="candidate_name"
                        placeholder="Your full name"
                        value={formData.candidate_name}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                        <FiMail />
                        Email
                      </span>

                      <input
                        type="email"
                        name="candidate_email"
                        placeholder="you@example.com"
                        value={formData.candidate_email}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                        <FiPhone />
                        Phone
                      </span>

                      <input
                        type="text"
                        name="candidate_phone"
                        placeholder="+880..."
                        value={formData.candidate_phone}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                        <FiLink />
                        Portfolio / LinkedIn
                      </span>

                      <input
                        type="url"
                        name="portfolio_link"
                        placeholder="https://..."
                        value={formData.portfolio_link}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </label>
                  </div>

                  <label className="mt-5 block">
                    <span className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                      <FiFileText />
                      Resume / CV Link
                    </span>

                    <input
                      type="url"
                      name="resume_link"
                      placeholder="Paste your Google Drive / Dropbox / LinkedIn CV link"
                      value={formData.resume_link}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      required
                    />

                    <p className="mt-2 text-xs font-medium text-slate-400">
                      Make sure the link is publicly accessible.
                    </p>
                  </label>

                  <label className="mt-5 block">
                    <span className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                      <FiFileText />
                      Cover Letter
                    </span>

                    <textarea
                      name="text"
                      placeholder="Tell us briefly about your experience, skills, and why you want to join Predien."
                      value={formData.text}
                      onChange={handleChange}
                      className="min-h-[220px] w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-slate-900 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    {!isSubmitting && <FiArrowRight />}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Apply;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req } = context;

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

  return {
    props: {
      slug,
      canonicalUrl: `${siteUrl}/job/apply/${slug}`,
    },
  };
}