import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";


export const durationChoice = [
  {value: 'INTERNSHIP', label: 'Internship'},
  {value: 'FULL_TIME', label: 'Full Time'},
  {value: 'CONTRACTUAL', label: 'Contractual'},
  {value: 'HALF_TIME', label: 'Half Time'},
  {value: 'HOURLY_BASED', label: 'Hourly Based'},
]


export const locationChoice = [
  {value: 'REMOTE', label: 'Remote'},
  {value: 'ON_SITE', label: 'On site'},
  {value: 'HYBRID', label: 'Hybrid'},

]


function JobCreate() {
  const [formData, setFormDta] = useState<any>();
  const [jobs, setJobs] = useState<any[]>([])

  const API_URL = process.env.NODE_ENV==="production" ? "https://predien.vercel.app" : "http://localhost:3000"

  const getJobs = () => {
    axios
      .get(`${API_URL}/api/jobs/`)
      .then((response) => {
        console.log(response.data);
        setJobs(response.data)
      })
      .catch(() => toast.error("Error fetch blogs !!"));
  };

  useEffect(()=>{
    getJobs()
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
    
    axios.post(`${API_URL}/api/jobs/`, formData).then((response)=>{
      toast.success('Job created sucessfully.')
      setFormDta(null);
      getJobs()
    }).catch(()=>toast.error('Error Job create !'))
  };

  const handleEdit = () => {

  }

  const handleDelete = (slug:string) => {
    axios.delete(`${API_URL}/api/jobs/${slug}`, formData).then((response)=>{
      toast.success('Job deleted sucessfully.')
      setFormDta(null);
      getJobs()
    }).catch(()=>toast.error('Error blog deleting !'))
  }

  console.log(formData)
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
              {jobs?.map((job:any, index:number) => (
                <tr key={index}>
                  <td className="px-2">{job.job_title}</td>
                  <td className="px-2">{moment(job.datetime).format("DD MMM YYYY")}</td>
                  <td>
                    <div className="flex gap-2 justify-center items-center">
                      <FiEdit2
                        className="cursor-pointer"
                        onClick={handleEdit}
                      />
                      <AiOutlineDelete
                        className="cursor-pointer"
                        onClick={()=>handleDelete(job.slug)}
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
              name="job_title"
              placeholder="Job title"
              onChange={(e)=>{
                const {name, value} = e.target
                setFormDta((prev:any)=>({...prev, [name]: value, slug: value.split(' ').join('-').toLowerCase() }))
              }}
              value={formData?.job_title || ""}
              className="px-4 py-2 bg-white outline-none border border-blue-500 focus:ring focus:ring-blue-500 text-gray-700"
            />
            <input
              type="text"
              name="slug"
              placeholder="Slug"
              onChange={handleChange}
              value={formData?.job_title.split(' ').join('-').toLowerCase() || formData?.slug ||  ""}
              className="px-4 py-2 bg-white outline-none border border-blue-500 focus:ring focus:ring-blue-500 text-gray-700"
            />
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={formData?.description || ""}
              className="px-4 py-2 bg-white outline-none border border-blue-500 focus:ring focus:ring-blue-500 text-gray-700"
            />

            <select name="duration" onChange={handleChange} className="px-4 py-2 bg-white outline-none border border-blue-500 focus:ring focus:ring-blue-500 text-gray-700">
              {durationChoice.map((item, index)=>(
                <option key={index} value={item.value}>{item.label}</option>
              ))}
            </select> 

            <select name="location" onChange={handleChange} className="px-4 py-2 bg-white outline-none border border-blue-500 focus:ring focus:ring-blue-500 text-gray-700">
              {locationChoice.map((item, index)=>(
                <option key={index} value={item.value}>{item.label}</option>
              ))}
            </select> 

            <input
              type="text"
              name="salary_range"
              placeholder="Salary range"
              onChange={handleChange}
              value={formData?.salary_range || ""}
              className="px-4 py-2 bg-white outline-none border border-blue-500 focus:ring focus:ring-blue-500 text-gray-700"
            />
            <input
              type="text"
              name="vacancy"
              placeholder="vacancy"
              onChange={handleChange}
              value={formData?.vacancy || ""}
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

export default JobCreate;
