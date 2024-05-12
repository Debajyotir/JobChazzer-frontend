import { Button, Typography } from '@mui/material';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <div className="bg-white w-full flex flex-col p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 place-items-center gap-3">
            <div className="col-span-1 h-full flex items-center">
                <Typography
                    fontWeight="bold"
                    fontSize= {"32px"}
                    color = "#0f52ba"
                >
                    JobChazzer
                </Typography>
            </div>
            <div className="col-span-1 flex flex-col gap-1 md:gap-3 items-center md:items-start ">
                <h4 className="font-semibold">For Job Seekers</h4>
                <p className="font-extralight text-sm text-slate-400">Jobs</p>
                <p className="font-extralight text-sm text-slate-400">Skills</p>
                <p className="font-extralight text-sm text-slate-400">Recommendation</p>
            </div>
            <div className="col-span-1 flex flex-col gap-1 md:gap-3 items-center md:items-start ">
                <h4 className="font-semibold">For Employers</h4>
                <p className="font-extralight text-sm text-slate-400">Event</p>
                <p className="font-extralight text-sm text-slate-400">Talent Pool</p>
                <p className="font-extralight text-sm text-slate-400">Recruitment</p>
            </div>

            <div className="col-span-1 hidden md:block lg:hidden"/>


            <div className="col-span-1 flex flex-col gap-1 md:gap-3 md:mt-3 lg:mt-0 items-center md:items-start md:-ml-[3rem]">
                <h4 className="font-semibold">Company</h4>
                <p className="font-extralight text-sm text-slate-400">About US</p>
                <p className="font-extralight text-sm text-slate-400">Join US</p>
                <p className="font-extralight text-sm text-slate-400">Contact US</p>
            </div>
            <div className="col-span-1 h-full flex flex-row items-center md:mt-3 lg:mt-0">
                
                <Button variant="text"><FacebookIcon/></Button>
                <Button variant="text"><LinkedInIcon/></Button>
                <Button variant="text"><TwitterIcon/></Button>
                
            </div>
        </div>

        <div className="w-full border-2 my-8" />
        <div className="flex flex-col justify-center items-center">
            <p className="font-extralight text-sm text-slate-400">Copyright &copy; 2024 JobChazzer. All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer