import React, { useEffect, useState } from "react";
import Drawer from "../Drawer";
import axios from "axios";
import { toast } from "react-toastify";
import Contentdit from "./contentdit";
import { SlateRenderer } from "../Renderer";
import { API_URL } from "@/pages/blog";

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
        console.log(response.data);
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
