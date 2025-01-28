import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

function BlogCreate() {
  const [formData, setFormDta] = useState<any>();
  const [blogs, setBlogs] = useState<any[]>([])

  const API_URL = process.env.NODE_ENV==="production" ? "https://predien.vercel.app" : "http://localhost:3000"

  const getBlogs = () => {
    axios
      .get(`${API_URL}/api/blogs/`)
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data)
      })
      .catch(() => toast.error("Error fetch blogs !!"));
  };

  useEffect(()=>{
    getBlogs()
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormDta((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/blogs/`, formData).then((response)=>{
      toast.success('Blog created sucessfully.')
      setFormDta(null);
      getBlogs()
    }).catch(()=>toast.error('Error blog create !'))
  };

  const handleEdit = () => {

  }

  const handleDelete = (slug:string) => {
    axios.delete(`${API_URL}/api/blogs/${slug}`, formData).then((response)=>{
      toast.success('Blog deleted sucessfully.')
      setFormDta(null);
      getBlogs()
    }).catch(()=>toast.error('Error blog deleting !'))
  }

  return (
    <div className="bg-gradient-to-l from-yellow-400 via-violet-400 to-red-400">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-20 py-12 text-white">
        <div className="mb-6">
          <table>
            <thead>
              <tr>
                <th className="px-2">Title</th>
                <th className="px-2">Posted at</th>
                <th className="px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.map((blog:any, index:number) => (
                <tr key={index}>
                  <td className="px-2">{blog.title}</td>
                  <td className="px-2">{moment(blog.datetime).format("DD MMM YYYY")}</td>
                  <td>
                    <div className="flex gap-2 justify-center items-center">
                      <FiEdit2
                        className="cursor-pointer"
                        onClick={handleEdit}
                      />
                      <AiOutlineDelete
                        className="cursor-pointer"
                        onClick={()=>handleDelete(blog.slug)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={formData?.title || ""}
              className="px-4 py-2 bg-white outline-none border border-blue-500 focus:ring focus:ring-blue-500 text-gray-700"
            />
            <input
              type="text"
              name="slug"
              placeholder="Slug"
              onChange={handleChange}
              value={formData?.slug || ""}
              className="px-4 py-2 bg-white outline-none border border-blue-500 focus:ring focus:ring-blue-500 text-gray-700"
            />
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={formData?.description || ""}
              className="px-4 py-2 bg-white outline-none border border-blue-500 focus:ring focus:ring-blue-500 text-gray-700"
            />

            <button
              type="submit"
              className="py-2 bg-blue-500 text-white font-bold hover:bg-blue-700 duration-200"
            >
              Create
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BlogCreate;
