import React, { use, useState } from "react";
import AdminLayout from "../_layout";
import Form from "@/components/Form";
import { API_URL } from "@/pages/blog";
import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";
import SlateEditor from "@/components/SlateEditor";
import { useTopicContext } from "@/context/TopicContext";

function Create() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>();

  const handleBlogCreate = (e: any) => {
    e.preventDefault();

    fetch(`${API_URL}/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    })
      .then((res) => {
        if (res.ok) {
          router.push("/admin/blogs");
        }
      })
      .catch((e) => console.log(e));
  };

  const { topics } = useTopicContext();

  const fields = [
    "title", 
    "slug@title", 
    "description", 
    "meta{title,description,keywords}",
    
    // Select field structure : 
    // field name*select>optionValue1:Option Label 1,optionValue2:Option Label 2
    // Example : "category*select>tech:Tech,health:Health,lifestyle:Lifestyle"
    `topic*select>${topics.map((t: any) => `${t._id}:${t.name}`).join(",")}`
  ];

  
  return (
    <AdminLayout>
      <button
        onClick={() => router.back()}
        className="text-blue-500 ring-blue-500 hover:ring-b flex items-center gap-2 mb-4"
      >
        <FaChevronLeft /> Back
      </button>
      <Form
        fields={fields}
        onChangeFields={(data) =>
          setFormData((prev: any) => ({ ...prev, ...data }))
        }
        onSubmit={handleBlogCreate}
        submitBtnName="Create"
      />
    </AdminLayout>
  );
}

export default Create;
