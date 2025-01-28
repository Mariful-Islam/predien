
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import moment from 'moment'
import React from 'react'
import { SlCalender } from 'react-icons/sl'


const API_URL = process.env.NODE_ENV==="production" ? "https://predien.vercel.app" : "http://localhost:3000"


function Blog({data}: {data:any}) {

  const extractH2Tags = (html:any) => {
    const matches = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)];
    return matches.map((match) => match[1]); 
  };


  const h2List = extractH2Tags(data?.description);


  return (
    <div className='bg-white dark:bg-black' >
      <div className='bg-gradient-to-l from-green-600 dark:from-green-800 via-violet-500 dark:via-violet-700 to-blue-400 dark:to-blue-700'>
        <Header/>
      </div>
      <div className='max-w-[1200px] mx-auto px-4 sm:px-20 py-12 dark:text-white text-black
      '>
        <div className='flex gap-12'>
          <div className='w-3/4'>
            <h1 className='text-5xl font-bold '>{data?.title}</h1>
            <div className='flex gap-2 items-center mt-3 '><SlCalender className='stroke-1'/>{moment(data?.datetime).format('DD MMM YYYY')}</div>
            <div className='mt-3'>
              <div dangerouslySetInnerHTML={{__html: data?.description || ''}} className='text-justify'/>
            </div>
            
          </div>
          <div className='w-1/4'>
            <h1 className='text-2xl font-bold'>Content</h1>
            <ul>
              {h2List?.map((head, index)=>(
                <li key={index}>
                  {head}
                </li>
              ))}
              
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Blog


export async function getServerSideProps(context:any) {
  
  const {slug} = context.params

  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}/`);  
    const data = await res.json();

    // If the request fails, return empty data or handle the error
    if (!res.ok) {
      return { props: { data: {} } };
    }

    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { data: {} } };
  }
}