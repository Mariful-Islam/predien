import React, { use, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { API_URL } from "@/pages/blog";
import Drawer from "@/components/Drawer";
import { SlateRenderer } from "@/components/Renderer";
import Contentdit from "@/components/admin/contentdit";
import { useRouter } from "next/navigation";

interface ViewProps {
  isOpen: boolean ;
  onClose: VoidFunction;
  item: any;
  name: string;
  keys: string[];
}

export default function View({
  isOpen,
  onClose,
  item,
  name,
  keys,
}: ViewProps) {

  const route = useRouter();

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<any>(null);

  console.log(isOpen, item, onClose, name, keys);

 

  return (
    <Drawer isOpen={isOpen ?? false} onClose={onClose|| (() => {})} title="item Detail">
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
                    <div className="flex flex-col gap-2" key={index}>
                      <div className="text-gray-600 font-bold">
                        {key?.split("_")?.join(" ")?.toUpperCase()}:{" "}
                      </div>
                      <SlateRenderer
                        data={item?.[key as any]}
                      />
                    </div>
                  );
                }
                if(key === "updatedAt"){
                  return (
                    <div className="flex gap-2" key={index}>
                      <div className="text-gray-600 font-bold">
                        {key?.split("_")?.join(" ")?.toUpperCase()}:{" "}
                      </div>
                      <div className=" break-after-auto">
                        {new Date(item?.[key as any])?.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
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
            refresh={() => route.refresh()}
          />
        )}
      </div>
    </Drawer>
  );
}
