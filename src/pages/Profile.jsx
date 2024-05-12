import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import axios from 'axios';
import {server} from "../App"
import Label from '../components/Label';
// import { user } from '../components/temp';
import AdWrapper from '../components/AdWrapper';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';


// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NjEzNzM1LCJpYXQiOjE3MTU1MjczMzUsImp0aSI6Ijc1Yzg5M2FjMmQ4YjQxMmY4YTEwZTgxZjdiZjAzM2M5IiwidXNlcl9pZCI6NTh9.QPa8ZfYztt_9hT30mNw6zPhWalgYz879N_SHdGb9bRY";


const Profile = () => {
  const [user,setUser] = useState(null);

  const token = useSelector(state=>state.login.token);

  useEffect(()=>{
    try {
      const call = async() => {
        const response =  await axios.get(`${server}/api/user/profile/`,{
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }});
        setUser(response.data);
      }
      call();
    } catch (error) {
      console.log(error);
    }
  },[]);

  if(user===null || !token)
    return <Loading />


  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">

      <div className="col-span-3 flex flex-col gap-4 m-4">

        <h1 className="font-extrabold text-xl">My Profile</h1>

        <div className="flex flex-row justify-between gap-1 w-full bg-white p-2 rounded-lg border-2">

          <div>
            <h1 className="font-semibold">
              {user.firstName} {user?.middleName} {user.lastName}
            </h1>
            <p className="text-sm mt-1">
              {user.about}
            </p>
            <p className="text-sm">
              {user.location}
            </p>
          </div>

          <div>
            <Button color="info">
              <EditIcon/>
            </Button>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-1 w-full bg-white p-2 rounded-lg border-2 overflow-hidden">
        {/* Personal Info */}

          <div className="flex flex-col gap-2 w-full">
            <h1 className="font-semibold">
              Personal Information
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">

              <div className="col-span-1">
                <Label label={"First Name"} value={user.firstName} />
              </div>

              <div className="col-span-1">
                <Label label={"Middle Name"} value={user.middleName} />
              </div>

              <div className="col-span-1">
                <Label label={"Last Name"} value={user.lastName} />
              </div>

              <div className="col-span-1">
                <Label label={"Email Address"} value={user.email} />
              </div>

              <div className="col-span-1">
                <Label label={"Date of Birth"} value={user.dob} />
              </div>

              <div className="col-span-1">
                <Label label={"Gender"} value={user.gender} />
              </div>

            </div>
          </div>

          <div>
            <Button color="info">
              <EditIcon/>
            </Button>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-1 w-full bg-white p-2 rounded-lg border-2">
        {/* Skills */}
          <div className="w-full">
            <h1 className="font-semibold">Skills</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full mt-1">
              {user.skill.map((val,i)=>(
                <span key={i} className="col-span-1">
                  &bull; {val}
                </span>
              ))}
            </div>
          </div>

          <div>
            <Button color="info">
              <EditIcon/>
            </Button>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-1 w-full bg-white p-2 rounded-lg border-2">
          {/* Educations */}
          <div className="w-full">
            <h1 className="font-semibold">Education</h1>
            <div className="w-full">
              {user.education.map((val,i)=>(
                <div key={i} className="flex flex-col w-full justify-between m-2">

                  <div className="flex flex-col md:flex-row w-full justify-between">
                    <div className="flex flex-col">
                      <h1 className="font-medium">&bull; {val.school}</h1>
                      <p className="text-sm font-extralight ml-2">
                        {val.degree}, {val.specialisation}
                      </p>
                    </div>
                    <div className="text-sm font-extralight ml-2">
                      {val.start} - {val.end}
                    </div>
                  </div>

                  <div className="border-[1px] border-[#f2f2f2]" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Button color="info">
              <EditIcon/>
            </Button>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-1 w-full bg-white p-2 rounded-lg border-2">
          {/* work experience */}
          <div className="w-full">
            <h1 className="font-semibold">Work Experience</h1>
            <div className="w-full">
              {user.work.map((val,i)=>(
                <div key={i} className="flex flex-col w-full justify-between m-2">

                  <div className="flex flex-col md:flex-row w-full justify-between">
                    <div className="flex flex-col">
                      <h1 className="font-medium">&bull; {val.organisation}</h1>
                      <p className="text-sm font-extralight ml-2">
                        {val.jobPost}
                      </p>
                      <p className="text-sm font-extralight ml-2">
                        {val.topSkill}
                      </p>
                    </div>
                    <div className="text-sm font-extralight ml-2">
                      {val.start} - {val.end===null ? "Present" : val.end}
                    </div>
                  </div>

                  <div className="border-[1px] border-[#f2f2f2]" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Button color="info">
              <EditIcon/>
            </Button>
          </div>
        </div>

      </div>


      <div className="w-full mt-16 col-span-1 hidden md:block">
        <AdWrapper/>
      </div>
    </div>
  )
}

export default Profile