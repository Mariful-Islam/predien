import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiLayers,
  FiCpu,
  FiCheckCircle,
} from "react-icons/fi";

interface ProductItem {
  name: string;
  slug: string;
  type?: string;
  description?: string;
  status?: string;
}

interface ProductGridProps {
  data: ProductItem[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-[#090d16]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <FiCpu className="text-xl" />
        </div>

        <h3 className="text-xl font-black text-slate-950 dark:text-white">
          No products available
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-500 dark:text-slate-400">
          No products deployed to production environment yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((item, index) => (
        <motion.article
          key={item.slug || index}
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
            href={`/product/${item.slug}`}
            aria-label={`View product ${item.name}`}
            className="relative block h-full overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-[#090d16]"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-blue-600 ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600 dark:bg-slate-900 dark:ring-slate-800">
                  <FiCpu className="text-xl" />
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-slate-800">
                  <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>

              {item.type && (
                <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  <FiLayers />
                  <span>{item.type}</span>
                </div>
              )}

              <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-500">
                {item.name}
              </h3>

              {item.description && (
                <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-slate-500 transition-colors duration-300 dark:text-slate-400">
                  {item.description}
                </p>
              )}

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                  <FiCheckCircle className="text-blue-600 dark:text-blue-500" />
                  <span>{item.status || "Production Ready"}</span>
                </div>

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-blue-500">
                  View
                </span>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
};

export default ProductGrid;