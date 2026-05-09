import React, { useEffect, useMemo, useState } from "react";
import Drawer from "../Drawer";
import axios from "axios";
import { toast } from "react-toastify";
import Contentdit from "./contentdit";
import { SlateRenderer } from "../Renderer";
import { API_URL } from "@/pages/blog";
import { slateToHtml } from "../slatetoHtml";

interface ContentViewProps {
  isOpen: boolean;
  onClose: VoidFunction;
  id: number;
  name: string;
  keys: string[];
}

export default function ContentView({
  isOpen,
  onClose,
  id,
  name,
  keys,
}: ContentViewProps) {
  const [item, setItem] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<any>(null);

  const getItem = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/${name}/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetch blogs !!");
        setLoading(false);
      });
  };

  useEffect(() => {
    getItem();
  }, []);


    const serializeToHtml = useMemo(() => {
      try {
        return slateToHtml(JSON.parse(item?.description || "[]"));
      } catch (e) {
        return "";
      }
    }, [item?.description]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="item Detail">
      <div className="bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-200">
        {loading ? (
          <div className="w-full flex justify-center items-center mt-12">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="border border-slate-300 dark:border-slate-700 p-4 rounded-md mb-4">
            <div className="flex justify-end">
              <button
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setEdit(item)}
              >
                Edit
              </button>
            </div>
            <div>
              {keys?.map((key, index) => {
                if (key === "description") {
                  return (
                    <>
                      {/* Prose Styling for Slate Content */}
                      <div
                        className="mt-10 prose prose-lg md:prose-xl dark:prose-invert prose-slate max-w-none 
                        prose-headings:tracking-tighter prose-headings:font-black prose-headings:text-slate-950 dark:prose-headings:text-white
                        prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:font-medium
                        prose-strong:text-blue-600 dark:prose-strong:text-blue-500
                        prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: serializeToHtml }}
                      />
                    </>
                  );
                }
                return (
                  <div className="flex gap-2" key={index}>
                    <div className="text-gray-600 font-bold">
                      {key?.split("_")?.join(" ")?.toUpperCase()}:{" "}
                    </div>
                    <div className=" break-after-auto">
                      {item?.[key as any]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {edit && (
          <Contentdit
            isOpen={edit ? true : false}
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
