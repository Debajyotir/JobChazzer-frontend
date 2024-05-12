import React from 'react';
import { Button } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BusinessIcon from '@mui/icons-material/Business';
import PlaceIcon from '@mui/icons-material/Place';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const JobCart = ({job}) => {
  return (
    <div className="bg-white rounded-md border-2 w-full col-span-1">
        <div className="flex flex-col w-full p-4 gap-2">
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="font-semibold">{job.job_post}</h1>
                    <p className="text-sm font-extralight text-slate-400">{job.company}</p>
                </div>
                <Button>
                    <BookmarkBorderIcon/>
                </Button>
            </div>

            <div className="grid grid-cols-2 mt-2 gap-2">
                <Points Icon={<BusinessIcon/>} name={job.company}/>
                <Points Icon={<PlaceIcon/>} name={job.job_location}/>
                <Points Icon={<WorkIcon/>} name={job.MIN_Needed_Exp + "-" + job.MAX_Needed_Exp}/>
                <Points Icon={<BusinessCenterIcon/>} name={"Listed Company"}/>
                <Points Icon={<MonetizationOnIcon/>} name={"15K-25K"}/>
            </div>

            <div className="flex flex-row flex-wrap gap-1 my-2">
                {job.required_skills.map((skill,i)=>(
                    <div key={i} className="bg-sky-100 px-3 py-1 rounded-md text-[#548ce5]">{skill}</div>
                ))}
                
            </div>

            <div className="border-[1px] border-[#2875EE]" />

            <div className="flex flex-row justify-end self-end">
                <Button variant="contained">Apply Now</Button>
            </div>
        </div>
    </div>
  )
};

const Points = ({Icon,name}) => (
    <div className="col-span-1 flex flex-row flex-wrap gap-1">
        <div className="font-extralight text-xs text-slate-400">
            {Icon}
        </div>
        <div className="mt-[3px] text-sm text-slate-500 overflow-auto break-words">{name}</div>
    </div>
)

export default JobCart;