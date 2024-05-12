import React, { useEffect, useState } from 'react';
import first from "../image/1092805-tech.jpg";
import second from "../image/rm373batch2-04.jpg";
import third from "../image/copy-space-of-home-and-life-concept-small-model-home-on-green-grass-with-sunlight-abstract-background-ai-generated-photo.jpg";
import four from "../image/images.png";
import five from "../image/level-1-fusion-adobestock_553813042-3x2.webp";
import six from "../image/images.jpg";
import seven from "../image/info4.jpeg";
import { Button } from '@mui/material';

const image = [first,second,third,four,five,six,seven];

const advertisements = [
    {
      companyName: "TechNest",
      companyWebsite: "technestsols.com",
      companyDescription: "Your technology partner for innovative solutions and digital transformation. We specialize in custom software development.",
    },
    {
      companyName: "Dynamics Inc.",
      companyWebsite: "gldynamicsinc.com",
      companyDescription: "Driving success through global insights and dynamic strategies. Your trusted advisor for business growth.",
    },
    {
      companyName: "EcoScape",
      companyWebsite: "ecoscapevent.com",
      companyDescription: "Creating sustainable landscapes for a greener tomorrow. Let us help you design your eco-friendly future.",
    },
    {
      companyName: "InnoVision",
      companyWebsite: "innovision.com",
      companyDescription: "Leading the way in research and development for groundbreaking innovations. Innovation is our passion.",
    },
    {
      companyName: "FusionWorks",
      companyWebsite: "fusionworks.com",
      companyDescription: "Bringing together the best in technology for seamless integration and efficiency. Empowering businesses with transformative solutions.",
    },
    {
      companyName: "ADynamics",
      companyWebsite: "adynamicsol.com",
      companyDescription: "Elevating businesses to their peak performance with cutting-edge solutions. Your success is our mission.",
    },
    {
      companyName: "MikaCosmetics",
      companyWebsite: "mikametics.com",
      companyDescription: "Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shining like light.",
    }
];
  

const AdWrapper = () => {
    const [index,setIndex] = useState(0);
    useEffect(()=>{
        const randomNumber = Math.floor(Math.random() * 7);
        setIndex(randomNumber);
    },[])
    
  return (
    <div className="bg-white rounded-lg border-2 flex flex-col p-2">
        <div className="flex flex-row justify-between">
            <h1 className="font-semibold">Sponsored</h1>
            <p className="text-[#53a9e7]">ad</p>
        </div>
        
        <img src={image[index]} className="w-full h-40 lg:h-56 rounded-md my-2"/>
        
        <div className="flex flex-col lg:flex-row justify-between">
            <h4>{advertisements[index].companyName}</h4>
            <p className="font-extralight text-sm text-slate-400">{advertisements[index].companyWebsite}</p>
        </div>

        <p className="font-extralight text-sm text-slate-400">{advertisements[index].companyDescription}</p>
    </div>
  )
}

export default AdWrapper