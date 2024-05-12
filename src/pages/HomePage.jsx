import React, { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection';
import { Trusted } from '../components/Trusted';
import JobCart from '../components/JobCart';
import axios from 'axios';
import { server } from '../App';
// import { jobs } from '../components/temp';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NTkwNTQzLCJpYXQiOjE3MTU1MDQxNDMsImp0aSI6Ijg3MjhjMDQ5MzliMDRmYzJiOThjMTRlM2ZjZTQxYWI5IiwidXNlcl9pZCI6NTV9.a-aG_I3UIdjd3zA7Jzv5kDiBUtMzfKckhQtRDEdIx6A";

const HomePage = () => {
  const [jobs,setJobs] = useState(null);

  const token = useSelector(state=>state.login.token);

  useEffect(()=>{
    const api = async() => {
      try {
        const res = await axios.get(`${server}/api/user/algorithmview/`,{
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }});
  
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    api();
  },[]);

  if(!jobs || !token)
    return <Loading/>

  return (
    <div>
        <HeroSection/>
        <Trusted/>
        <div className="flex flex-col p-4">
          <h1 className="font-extrabold text-xl">
            Jobs We Think Best Suit Your Skills
          </h1>
          <div className="w-full p-4 grid grid-cols-1 gap-2">
            {jobs.data.map((job,i)=>(
              <JobCart key={i} job={job} />
            ))}
            
          </div>
        </div>

        <div className="flex flex-col p-5 bg-[#0f52ba] text-white gap-4">
          <div className="flex justify-center items-center font-extrabold mt-2">
              <p>Skills We Recommend You to Learn</p>
          </div>
          <div className="flex flex-col md:flex-row justify-around font-bold items-center gap-4 md:gap-0 md:py-5">
            {jobs.top_skills.map((val,i)=>(
              <div key={i}>{val}</div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default HomePage