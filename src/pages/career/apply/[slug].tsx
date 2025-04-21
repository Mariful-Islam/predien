import Header from "@/components/Header";
import { BASE_URL } from "@/pages/services/custom-software-development";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "react-toastify";
import { LuUpload } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";


function Apply({slug}:{slug: string}) {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null);
  const [confirmation, setConfirmation] = useState<boolean>(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(slug)

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Application for ${slug}`;
    const text =
      "Email: " +
      formData?.candidate_email +
      "\n" +
      "Phone Number: " +
      formData?.candidate_phone +
      "\n" +
      "Subject: " + 
      subject + 
      "\n\n\n" +
      formData?.text 
      

    const newFormData = {
      subject: subject,
      text: text,
      resume: formData?.resume
    };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.candidate_email)) {
      toast.error('Email is not valid.')
    } else {
      axios.post(`${BASE_URL}/api/apply/`, newFormData, {headers: {
        'Content-Type': 'multipart/form-data',
      }})
        .then((response: any) => {
          setConfirmation(true)
          setFormData(null)
        })
        .catch(() => toast.error("Error apply to the Predien team!"));
    }
    
  };

  const handleRemoveResume = () => {
    setFormData((prev:any)=>({...prev, resume: null}))
  }
 
  return (
    <div className="bg-white dark:bg-black">
      <div className="bg-gradient-to-l from-yellow-400 via-violet-400 to-red-400">
        <Header />
      </div>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-20 py-12 text-gray-700 dark:text-white">
        <button
          onClick={()=>router.back()}
          className=" group flex gap-2 items-center justify-center  mb-4 text-blue-500 focus:ring-1 w-[80px]"
        >
          <GoArrowLeft className="text-blue-500 group-hover:-translate-x-2 duration-200" />{" "}
          Back
        </button>
        
        <div>
          {confirmation ? 
          <div className="text-xl text-gray-800 font-bold mt-10 flex gap-3 w-full justify-center items-center">
            Thank for applying for this position <div className="text-blue-500">{slug.split('-').join(' ')}</div>
          </div>
          :
          <div>
            <h2 className="font-bold text-xl text-center">Applying for <div className="text-green-500">{slug.split('-').join(' ')}</div></h2>
            <form onSubmit={handleApply} className="flex flex-col gap-4 mt-6 w-full px-4 sm:px-12">
              <input
                type="email"
                name="candidate_email"
                placeholder="Your email"
                value={formData?.candidate_email}
                onChange={handleChange}
                className="bg-white dark:bg-gray-800 px-4 py-2 rounded-none border border-blue-500 outline-none focus:ring-2 "
                required
              
              />

              <input
                type="text"
                name="candidate_phone"
                placeholder="Your phone"
                value={formData?.candidate_phone}
                onChange={handleChange}
                className="bg-white dark:bg-gray-800 px-4 py-2 rounded-none border border-blue-500 outline-none focus:ring-2 "
                required
              />

              <textarea
                name="text"
                placeholder="Cover letter"
                value={formData?.text}
                onChange={handleChange}
                className="bg-white dark:bg-gray-800 px-4 py-2 min-h-[300px] rounded-none border border-blue-500 outline-none focus:ring-2 "
                required
              />

              <div>
                <div className="text-blue-500">Upload your resume </div>
                {formData?.resume ? 
                  <div>
                    <button 
                      onClick={handleRemoveResume} 
                      className="w-full flex justify-end my-2"
                    >
                      <AiOutlineDelete className="w-6 h-6 text-red-500" />
                    </button>
                    <div>{formData?.resume?.name}</div>
                  </div>
                  :
                  <label htmlFor="resume" className="border border-gray-300 rounded-md p-10 mt-2 flex justify-center hover:border-blue-500 group duration-200">
                    <LuUpload className=" group-hover:text-blue-500 duration-200 h-12 w-12"/>
                  </label>
                }
                <input 
                  id="resume" 
                  type="file" 
                  className="hidden" 
                  onChange={(e)=>{
                    setFormData((prev:any)=>({...prev, resume: e.target.files && e.target.files[0] })) 

                  }}
                />
              </div>
              

              <button 
                type="submit"
                className="bg-blue-500 text-white  hover:bg-blue-700 duration-200 py-2 font-bold text-lg"
              >
                Apply
              </button>
            </form>
          </div>
          }
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Apply;


export async function getServerSideProps(context: any) {
  const { slug } = context.params;

  return { props: { slug } }

}

