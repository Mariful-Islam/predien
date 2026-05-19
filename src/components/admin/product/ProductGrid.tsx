import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiLayers } from "react-icons/fi";

interface ProductItem {
  name: string;
  slug: string;
  type?: string;
  description?: string;
}

interface ProductGridProps {
  data: ProductItem[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ data }) => {
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Link href={`/product/${item?.slug}/`} className="group block h-full">
              <div className="relative h-[280px] bg-white dark:bg-[#090d16] border border-slate-200/60 dark:border-white/5 rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] border-b-2 hover:border-b-blue-600 dark:hover:border-b-blue-500 transition-all duration-500">
                
                {/* Background Ambient Flare on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="space-y-4">
                  {/* Product Type Metadata Tag */}
                  {item?.type && (
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      <FiLayers className="text-blue-500" />
                      <span>{item.type}</span>
                    </div>
                  )}

                  {/* Product Title */}
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300">
                    {item.name}
                  </h3>

                  {/* Product Description */}
                  {item?.description && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium line-clamp-3 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Modern Directional Arrow Hub */}
                <div className="self-end flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:border-transparent text-slate-400 dark:text-slate-500 group-hover:text-white transition-all duration-500 shadow-sm">
                  <FiArrowUpRight className="text-xl transition-transform duration-500 group-hover:rotate-45" />
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {(!data || data.length === 0) && (
        <div className="text-center py-20 bg-white dark:bg-[#090d16] border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
          <p className="text-slate-400 font-medium">No products deployed to production environment yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;