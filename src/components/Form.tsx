import React, { useEffect, useState } from "react";
import Button from "./Button";
import SlateEditor from "@/components/SlateEditor"
import { useRouter } from "next/router";

interface FormProps {
  fields: any[];
  onChangeFields: (data: any) => void;
  edit?: any;
  onClose?: VoidFunction;
  onSubmit: (e: React.FormEvent) => string | void;
  submitBtnName?: string;
}

function Form({
  fields,
  onChangeFields,
  edit,
  onClose,
  onSubmit,
  submitBtnName,
}: FormProps) {
  const [formData, setFormData] = useState<any>(edit ? edit : {});
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()


  const onChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    onChangeFields(formData);
  }, [formData]);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = onSubmit(e);

    if (res === "success" || res === "failed") {
      setLoading(false);
    } else {
      setInterval(() => {
        setLoading(false);
      }, 1000);
    }
  };


  // Assuming your field definition is something like "slug@title"
  const slugConfig = fields.find(f => f.startsWith("slug@"));
  const sourceFieldName = slugConfig?.split("@")[1];

  useEffect(() => {
    if (sourceFieldName && formData[sourceFieldName]) {
      const newSlug = formData[sourceFieldName]
        .toLowerCase()
        .trim()
        .split(" ")
        .join("-");

      // Only update if the slug has actually changed to avoid unnecessary renders
      if (formData.slug !== newSlug) {
        setFormData((prev:any) => ({
          ...prev,
          slug: newSlug
        }));
      }
    }
  }, [formData[sourceFieldName]]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
      {fields?.map((field, index) => {
        if (field === "description") {
          return (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={field}
                className="text-sm font-medium text-slate-500 dark:text-slate-300"
              >
                {field.split("_").join(" ").toUpperCase()}
              </label>
              
              <div className="bg-white dark:bg-black rounded-md">
                <SlateEditor
                  value={formData.description ? JSON.parse(formData.description) : ""}  
                  onChange={(value:any)=>{
                    setFormData((prev:any)=>({
                      ...prev,
                      'description': JSON.stringify(value)
                    }))
                  }}
                  
                />
              </div>
            </div>
          );
        } else if(field?.split("@")[0]==="slug"){
          

          return (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={field?.split("@")[0]}
                className="text-sm font-medium text-slate-500 dark:text-slate-300"
              >
                {field?.split("@")[0].toUpperCase()}
              </label>
              <input
                id={field?.split("@")[0]}
                type="text"
                name={field?.split("@")[0]}
                placeholder={`Type ${field?.split("@")[0]}`}
              
                value={(formData?.[field?.split("@")[1]])?.toLowerCase()?.split(" ")?.join("-") || ""}
                disabled
           
                className="bg-white dark:bg-gray-700 block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-blue-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"

              />
            </div>
          );  

        } else if (field?.split("*")[1]?.split(">")[0] === "select") {
          return (
            <div key={index} className="flex flex-col gap-2 bg-white dark:bg-gray-700 rounded-md p-2">
              <label
                htmlFor={field}
                className="text-sm font-medium text-slate-500 dark:text-slate-300"
              >
                {field?.split("*")[0]?.split("_")?.join(" ")?.toUpperCase()}
              </label>

              <select
                id={field?.split("*")[0]}
                name={field?.split("*")[0]}
                value={formData?.[field?.split("*")[0]] || ""}
                onChange={onChange}
                className="block rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
              >
                <option value="" disabled>Select a option</option>

                {field
                  ?.split(">")[1]
                  ?.split(",")
                  ?.map((option: any, index: number) => {
                    const [value, label] = option.split(":");
                    return(
                    <option key={index} value={value}>
                      {label}
                    </option>
                  )})}
              </select>
            </div>
          );
        } else if(field.split("*")[1] === "multiselect") {
          return(
            <div>
              dsfcsd
            </div>
          )
        } else if (field.split("*")[1] === "number") {
          return (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={field}
                className="text-sm font-medium text-slate-500 dark:text-slate-300"
              >
                {field?.split("*")[0]?.split("_")?.join(" ")?.toUpperCase()}
              </label>
              <input
                id={field}
                type="number"
                name={field?.split("*")[0]}
                placeholder={`Type ${field
                  ?.split("*")[0]
                  ?.split("_")
                  ?.join(" ")}`}
                value={formData?.[field?.split("*")[0]] || ""}
                onChange={onChange}
                className="bg-white block rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
              />
            </div>
          );
        } else if (field.split("*")[1] === "date") {
          return (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={field}
                className="text-sm font-medium text-slate-500 dark:text-slate-300"
              >
                {field?.split("*")[0]?.split("_")?.join(" ")?.toUpperCase()}
              </label>
              <input
                id={field}
                type="date"
                name={field?.split("*")[0]}
                placeholder={`Type ${field
                  ?.split("*")[0]
                  ?.split("_")
                  ?.join(" ")}`}
                value={formData?.[field?.split("*")[0]] || ""}
                onChange={onChange}
                className="bg-white block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
              />
            </div>
          );
        } else if(field.includes("{") && field.includes("}")){


          const onChangeSubField = (e:any) => {
            const { name, value } = e.target;
            const mainField = field.split("{")[0];
            const subField = name;

            setFormData((prev:any) => ({
              ...prev,
              [mainField]: {
                ...prev[mainField],
                [subField]: value
              }
            }))
          }
          
          return (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={field}
                className="text-sm font-medium text-slate-500 dark:text-slate-300"
              >
                {field?.split("{")[0]?.split("_")?.join(" ")?.toUpperCase()}
              </label>

              {field
                  ?.split("{")[1]
                  ?.split("}")[0]
                  ?.split(",")
                  ?.map((subField: any, index: number) => {
                    return(
                    <input 
                      key={index}
                      type="text"
                      name={subField}
                      placeholder={`Type ${subField.split("_").join(" ")}`}
                      value={formData?.[field.split("{")[0]]?.[subField] || ""}
                      onChange={onChangeSubField}
                      className="bg-white block rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    />
                  )})}
            </div>
          );

        } else {
          return (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={field}
                className="text-sm font-medium text-slate-500 dark:text-slate-300"
              >
                {field.split("_").join(" ").toUpperCase()}
              </label>
              <input
                id={field}
                type="text"
                name={field}
                placeholder={`Type ${field.split("_").join(" ")}`}
                value={formData?.[field] || ""}
                onChange={onChange}
                className="bg-white dark:bg-gray-700 block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-blue-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
              />
            </div>
          );
        }
      })}

      <div className="mt-4 flex gap-4 justify-end">
        <Button type="DangerOutline" onClick={()=>router.push(`/admin/blog`)}>
          Cancel
        </Button>
        <Button type="Normal" submit>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div>{submitBtnName ? submitBtnName : "Submit"}</div>
          )}
        </Button>
      </div>
    </form>
  );
}

export default Form;
