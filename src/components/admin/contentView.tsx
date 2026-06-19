import React, { useEffect, useMemo, useState } from "react";
import Drawer from "../Drawer";
import axios from "axios";
import { toast } from "react-toastify";
import Contentdit from "./contentdit";
import { slateToHtml } from "../slatetoHtml";
import { useRouter } from "next/navigation";

interface ContentViewProps {
  isOpen: boolean;
  onClose: VoidFunction;
  id: number;
  name: string;
}

const API_URL = process.env.NODE_ENV === "production" ? "https://predien.vercel.app" : "http://localhost:3000"

export default function ContentView({
  isOpen,
  onClose,
  id,
  name,
}: ContentViewProps) {
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<any>(null);

  const getItem = () => {
    if (!id || !name) return;
    setLoading(true);
    axios
      .get(`${API_URL}/api/${name}/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching data !!");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      getItem();
    }
  }, [id, name, isOpen]);

  const serializeToHtml = useMemo(() => {
    try {
      return slateToHtml(JSON.parse(item?.description || "[]"));
    } catch (e) {
      return "";
    }
  }, [item?.description]);

  const renderValue = (val: any) => {
    if (val === null || val === undefined) return <span className="text-slate-400 dark:text-slate-500 italic text-sm">Empty</span>;
    if (typeof val === "boolean") {
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${val ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
          {val ? "True" : "False"}
        </span>
      );
    }
    if (typeof val === "object") {
      return <pre className="font-mono text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-2 rounded border border-slate-100 dark:border-slate-800/50 overflow-x-auto">{JSON.stringify(val, null, 2)}</pre>;
    }
    return <span className="text-slate-700 dark:text-slate-300 selection:bg-indigo-500/10">{String(val)}</span>;
  };

  const dynamicKeys = useMemo(() => {
    if (!item) return [];
    // Filter out complex blocks to handle them safely below, or leave them sorted
    return Object.keys(item);
  }, [item]);

  // Separate description and meta from general inline fields for a better hierarchical layout
  const generalFields = dynamicKeys.filter(k => k !== "description" && k !== "meta");

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`${item?.title || item?.name || "View Details"}`}
    >
      <div className="text-slate-900 dark:text-slate-100 antialiased max-w-4xl mx-auto">
        {loading ? (
          <div className="w-full flex flex-col justify-center items-center py-24 gap-4">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 tracking-wider uppercase">Loading parameters...</p>
          </div>
        ) : (
          <div className="space-y-6 pb-12">
            {/* Metadata Grid Container */}
            {generalFields.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-sm shadow-slate-100 dark:shadow-none">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-400 dark:text-slate-500">Properties</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {generalFields.map((key) => (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-3.5 hover:bg-slate-50/30 dark:hover:bg-slate-800/10 transition-colors" key={key}>
                      <span className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase pt-0.5">
                        {key.split("_").join(" ")}
                      </span>
                      <div className="sm:col-span-2 text-sm break-all whitespace-pre-wrap font-medium">
                        {renderValue(item[key])}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meta Field View Card */}
            {dynamicKeys.includes("meta") && item?.meta && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-sm shadow-slate-100 dark:shadow-none">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-400 dark:text-slate-500">Meta Tags Configuration</h3>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/30 dark:bg-slate-900/20">
                  {Object.entries(item.meta).map(([metaKey, metaValue]) => (
                    <div key={metaKey} className="bg-white dark:bg-slate-950 p-3.5 rounded-lg border border-slate-100 dark:border-slate-800/60 shadow-sm shadow-slate-50/50 dark:shadow-none">
                      <div className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">
                        {metaKey.split("_").join(" ")}
                      </div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 break-words">
                        {typeof metaValue === "object" ? JSON.stringify(metaValue) : String(metaValue)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description/Rich Content Card */}
            {dynamicKeys.includes("description") && item?.description && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-sm shadow-slate-100 dark:shadow-none">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-400 dark:text-slate-500">Description</h3>
                </div>
                <div className="p-6 md:p-8 selection:bg-indigo-500/10">
                  <div
                    className="prose prose-slate dark:prose-invert max-w-none 
                    prose-headings:tracking-tight prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-slate-50
                    prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-base
                    prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-semibold
                    prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:font-medium hover:prose-a:text-indigo-500 dark:hover:prose-a:text-indigo-300 transition-colors"
                    dangerouslySetInnerHTML={{ __html: serializeToHtml }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {edit && (
          <Contentdit
            isOpen={!!edit}
            onClose={() => setEdit(null)}
            edit={edit}
            name={name}
            refresh={getItem}
          />
        )}
      </div>
    </Drawer>
  );
}