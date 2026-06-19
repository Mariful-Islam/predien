import React from "react";
// 1. Changed import from 'next/navigation' to 'next/router'
import { useRouter } from "next/router";
import AdminLayout from "../../_layout";
import Form from "@/components/Form";
import Button from "@/components/Button";
import { BsChevronBarLeft } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import { useTopicContext } from "@/context/TopicContext";

const API_URL = process.env.NODE_ENV === "production" ? "https://predien.vercel.app" : "http://localhost:3000"


function Edit() {
  // 2. Initialize the Pages Router
  const router = useRouter();
  // 3. Extract slug from router.query
  const { slug } = router.query;

  const [formData, setFormData] = React.useState<any>();

  // 4. Wrapped getBlog in useCallback or passed slug as an argument
  // to prevent dependency array issues in useEffect
  const getBlog = (currentSlug: string) => {
    fetch(`${API_URL}/api/blogs/${currentSlug}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    // Next.js Pages router query object might be empty on initial render.
    // We ensure slug exists and is a string before fetching.
    if (slug && typeof slug === "string") {
      getBlog(slug);
    }
  }, [slug]);


  const handleUpdate = () => {
    fetch(`${API_URL}/api/blogs/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // 5. Navigate to the blogs list page after successful update
        router.push("/admin/blogs");
      })
      .catch((e) => console.log(e));
  };


  const {topics} = useTopicContext()


  console.log(formData, "eeeeeeeeeeee")

  return (
    <AdminLayout>
      <button
        onClick={() => router.back()}
        className="text-blue-500 flex items-center gap-2 mb-4 text-sm border-b-2"
      >
        <FaChevronLeft /> {formData?.title ? formData?.title : "Back"}
      </button>

      <div className="mt-4">
        {formData ? (
          <Form
            fields={[
              "title",
              "slug@title",
              "description",
              "meta{title,description,keywords}",
              `topic*select>${topics.map((t: any) => `${t._id}:${t.name}`).join(",")}`,
            ]}
            edit={formData}
            onChangeFields={(data) =>
              setFormData((prev: any) => ({ ...prev, ...data }))
            }
            onSubmit={handleUpdate}
            submitBtnName="Update"
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </AdminLayout>
  );
}

export default Edit;
