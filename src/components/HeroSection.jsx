import React, { useState } from 'react';
import image from "../image/project.svg";
import { Button } from '@mui/material';
import Search from './Search';

const HeroSection = () => {
  const [openSearch,setOpenSearch] = useState(false);
  const handleClick = () => {
    setOpenSearch(true);
  }
  return (
    <div className="flex flex-col lg:flex-row bg-white px-10 h-full">

      <div className="flex items-center flex-wrap gap-12 lg:gap-0">
        {/* <div className="lg:w-5/12 space-y-8"> */}
        <div className="space-y-8 lg:w-10/12">
          <span className="flex space-x-2">
            <span className="block w-14 mb-2 border-b-2 border-gray-700"></span>
            <span className="font-medium text-gray-600">
              One Stop Solution to Find Your Dream Jobs
            </span>
          </span>
          <h1 className="text-4xl font-bold md:text-6xl">
            The Best <br /> Job Portal App
          </h1>
          <p className="text-xl text-gray-700">
            Find Best Jobs From Top Tech Companies and Build
            Your Career
          </p>
          <Button variant="contained" onClick={handleClick}>Find Your Dream Job</Button>
        </div>
      </div>

      <div className="lg:w-1/2 flex items-center justify-center lg:-mt-20 lg:ml-48">
          <img src={image} alt="Hero Img"/>
      </div>

      <Search openSearch={openSearch} setOpenSearch={setOpenSearch}/>

    </div>
  )
}

export default HeroSection