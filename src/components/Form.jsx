import { Box, Button, FormHelperText, TextField, Typography, useMediaQuery } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FieldArray, Form, Formik } from 'formik'
import React from 'react'
import * as yup from "yup";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import {server} from "../App";
import { useDispatch } from 'react-redux';
import { addToken } from '../store/login/loginSlice';
import { useNavigate } from 'react-router-dom';



const loginInitialValues ={
    email:"",
    password:"",
}

const loginSchema = yup.object().shape({
    email:yup.string().email('Invalid email format').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email address').required('Email is required'),
    password:yup.string().min(8, "Password must have at least 8 characters").matches(/[0-9]/, "Your password must have at least one digit character")
            .matches(/[a-z]/, "Your password must have at least one lowercase character").matches(/[A-Z]/, "Your password must have at least one uppercase character")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character').required("Please enter a password"),
})


const registerInitialValues ={
    firstName:"",
    middleName:"",
    lastName:"",
    gender:"",
    dob:null,
    skill:"",
    about:"",
    email:"",
    password:"",
    confirmPassword:"",
    education:[{school:"",degree:"",specialisation:"",start:null,end:null}],
    experienced:"",
    yoe:0,
    moe:0,
    work:[{organisation:"",topSkill:"",current:"",jobPost:"",start:null,end:null}],
    phone:"",
    location:"",
};

const registerSchema = yup.object().shape({
    firstName:yup.string().required("FirstName is required"),
    middleName:yup.string(),
    lastName:yup.string().required("Last Name is required"),
    gender:yup.string().required("Gender is required"),
    dob: yup.date().required("Date of Birth is required").test('is-over-18', 'Must be 18 years or older', (value) => {
        const currentDate = new Date();
        const birthDate = new Date(value);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        return age >= 18;
      }),
    skill:yup.string().required("Skill is required"),
    about:yup.string().required("At least one achievement is needed"),
    email:yup.string().email('Invalid email format').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email address').required('Email is required'),
    password:yup.string().min(8, "Password must have at least 8 characters").matches(/[0-9]/, "Your password must have at least one digit character")
            .matches(/[a-z]/, "Your password must have at least one lowercase character").matches(/[A-Z]/, "Your password must have at least one uppercase character")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character').required("Please enter a password"),
    confirmPassword:yup.string().required("Please re-type your password").oneOf([yup.ref("password")], "Passwords does not match"),
    education:yup.array(yup.object({
                school: yup.string().required("School is required"),
                degree: yup.string().required("Degree is required"),
                specialisation: yup.string().required("Specialisation is required"),
                start: yup.date().required("Starting Date is required"),
                end: yup.date().required("Ending Date is required").min(yup.ref("start"),"ending date can't be before starting date"),
            })).min(1,"At least one education is required"),
    experienced:yup.string().required("This is required"),
    location:yup.string().required("This is required"),
    phone:yup.string().matches(/^\+?\d+$/, 'Invalid phone number format').required("This is required"),
});

const FormPage = ({page,registerPage}) => {

    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSingUP = async (values, onSubmitProps) => {
        try {
            // console.log(values);
            console.log("running2");
            let b = values.dob.$M + 1;
            let a = values.dob.$y + "-" + b + "-" + values.dob.$D;
            values.dob =  a;
            values.education.map((val,i)=>{
                b = val.start.$M + 1;
                a = val.start.$y + "-" + b + "-" + val.start.$D;
                values.education[i].start = a;

                b = val.end.$M + 1;
                a = val.end.$y + "-" + b + "-" + val.end.$D;
                values.education[i].end = a;
            })

            values?.work.map((val,i)=>{
                if(val.start){
                    b = val.start.$M + 1;
                    a = val.start.$y + "-" + b + "-" + val.start.$D;
                    values.work[i].start = a;
                }

                if(val.end){

                    b = val.end.$M + 1;
                    a = val.end.$y + "-" + b + "-" + val.end.$D;
                    values.work[i].end = a;
                }

            })

            if(values.experienced === "NO"){
                values.work = [];
            }

            


            // console.log(values);

            const savedUserResponse =  await axios.post(`${server}/api/user/register/`, values);

            onSubmitProps.resetForm();

            dispatch(addToken({token:savedUserResponse.data.token.access}));

            // console.log(savedUserResponse);

            navigate("/");


        } catch (error) {
            console.log("error is ",error);
        }
    }

    const handleLogin = async (values, onSubmitProps) => {
        try {
            // console.log(values);
            console.log("running3");

            const savedUserResponse =  await axios.post(`${server}/api/user/login/`, values);

            onSubmitProps.resetForm();

            // console.log(savedUserResponse);
            dispatch(addToken({token:savedUserResponse.data.token.access}));

            navigate("/");


        } catch (error) {
            console.log("error is ",error);
        }
    }

  return (
    <>
        {page==="login" && (
        <Formik
            initialValues={loginInitialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
        >
            {({values,errors, touched, handleBlur, handleChange,resetForm})=>(
                <Form>
                    <Box display="grid" gap="30px" gridTemplateColumns="repeate(4,minmax(0, 1fr))" sx={{
                        "& > div" : {gridColumn: isNonMobileScreens ? undefined : "span 4"}
                        }}
                    >
                        {page==="login" && (<>
                            <TextField 
                                label="Email"
                                name="email"
                                placeholder='e.g. :- abc@gmail.com'
                                // value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{
                                    gridColumn:"span 4"
                                }}
                            />

                            <TextField 
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder='e.g. :- Abc#1234'
                                // value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{
                                    gridColumn:"span 4"
                                }}
                            />
                            
                        </>)}

                    </Box>

                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m:"2rem 0",
                                p:"1rem",
                                backgroundColor:"#0f52ba",
                                color:"#fff",
                                "&:hover":{color:"#0f52ba"}
                            }}
                        >
                            {"SINGIN"}
                        </Button>

                        <Typography
                            onClick={()=>{
                            {registerPage("singup")}
                            resetForm()
                            } }
                            sx={{
                                textDecoration:"underline",
                                color:"#0f52ba",
                                "&:hover":{
                                    cursor:"pointer",
                                    color:"rgba(15, 82, 186,0.1)"
                                }
                            }}
                        >
                            {"Don't have an account? Sing Up here"}
                        </Typography>


                    </Box>


                </Form>
            )}
        </Formik>
        )}

        {page==="singup" &&(
            <Formik
                initialValues={registerInitialValues}
                validationSchema={registerSchema}
                onSubmit={handleSingUP}
            >
                {({values,errors, touched, handleBlur, handleChange,resetForm,setFieldValue, setFieldTouched})=>(
                    <Form>
                        <Box display="grid" gap="30px" gridTemplateColumns="repeate(4,minmax(0, 1fr))" sx={{
                            "& > div" : {gridColumn: isNonMobileScreens ? undefined : "span 4"}
                            }}
                        >
                            
                            <TextField 
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.firstName}
                                name="firstName"
                                placeholder="Ram"
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx={{
                                    gridColumn:"span 2"
                                }}
                            />

                            <TextField 
                                label="Middle Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.middleName}
                                name="middleName"
                                placeholder="Kumar"
                                sx={{
                                    gridColumn:"span 2"
                                }}
                            />

                            <TextField 
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.lastName}
                                name="lastName"
                                placeholder="Dutta"
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                sx={{
                                    gridColumn:"span 2"
                                }}
                            />


                            <FormControl fullWidth sx={{gridColumn:"span 2"}}>
                                <InputLabel id="gender-select-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-select-label"
                                    id="gender-select"
                                    value={values.gender}
                                    name='gender'
                                    label="Gender"
                                    onChange={handleChange}
                                    error={Boolean(touched.gender) && Boolean(errors.gender)}
                                >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                                </Select>
                                <FormHelperText sx={{color:"#d32f2f"}}>
                                    {touched.gender && errors.gender}
                                </FormHelperText>
                            </FormControl>



                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date of Birth"
                                    value={values.dob}
                                    onChange={(date) => setFieldValue("dob", date)}
                                    onBlur={() => setFieldTouched("dob")}
                                    slotProps={{
                                        textField: {
                                        error: Boolean(touched?.dob) && Boolean(errors?.dob),
                                        helperText: touched?.dob && errors?.dob
                                        },
                                    }}
                                    format="DD/MM/YYYY"
                                    sx={{
                                        gridColumn: 'span 4',
                                    }}
                                />
                            </LocalizationProvider>

                            <TextField 
                                label="Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.location}
                                name="location"
                                placeholder="e.g:- Kolkata, West Bengal, India"
                                error={Boolean(touched.location) && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                sx={{
                                    gridColumn:"span 4"
                                }}
                            />

                            <TextField 
                                label="Skills"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.lastName}
                                name="skill"
                                placeholder="e.g:- C++, React, Java"
                                error={Boolean(touched.skill) && Boolean(errors.skill)}
                                helperText={touched.skill && errors.skill}
                                sx={{
                                    gridColumn:"span 4"
                                }}
                            />

                            <TextField 
                                label="Top Achievements"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.lastName}
                                name="about"
                                placeholder="e.g:- 5* at codechef, React developer"
                                error={Boolean(touched.about) && Boolean(errors.about)}
                                helperText={touched.about && errors.about}
                                sx={{
                                    gridColumn:"span 4"
                                }}
                            />

                            <TextField 
                                label="Email"
                                name="email"
                                placeholder='e.g. :- abc@gmail.com'
                                // value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{
                                    gridColumn:"span 4"
                                }}
                            />

                            <TextField 
                                label="Phone Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.phone}
                                name="phone"
                                placeholder="e.g:- +917997250001"
                                error={Boolean(touched.phone) && Boolean(errors.phone)}
                                helperText={touched.phone && errors.phone}
                                sx={{
                                    gridColumn:"span 4"
                                }}
                            />

                            <TextField 
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder='At least 8 character including an uppercase, a lowercase, a numeric and a special character'
                                // value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{
                                    gridColumn:"span 4"
                                }}
                            />

                            <TextField 
                                label="Confirm Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder='Re-enter the given password'
                                // value={values.confirmPassword}
                                name="confirmPassword"
                                error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                sx={{
                                    gridColumn:"span 4"
                                }}
                            />
                            
                        </Box>

                        <FieldArray
                            name="education"
                        >
                            {({push,remove})=>(
                                <>
                                    <div style={{ textAlign: 'center', marginTop:"2rem" }}>
                                        <Typography
                                            fontWeight="bold"
                                            sx={{
                                                display: 'inline-block',
                                            }}
                                        >
                                            Add your education
                                        </Typography>
                                    </div>
                                    {values.education && values.education.map((_,index)=>(
                                        <Box key={index} display="grid" gap="30px" gridTemplateColumns="repeate(4,minmax(0, 1fr))" sx={{
                                        "& > div" : {gridColumn: isNonMobileScreens ? undefined : "span 4"},  marginTop:"1rem"}}
                                        >
                                            <TextField 
                                                label="Degree"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder='e.g. :- Bachelor of Technology'
                                                name={`education[${index}].degree`}
                                                error={Boolean(touched.education?.[index]?.degree) && Boolean(errors.education?.[index]?.degree)}
                                                helperText={touched.education?.[index]?.degree && errors.education?.[index]?.degree}
                                                sx={{
                                                    gridColumn:"span 2"
                                                }}
                                            />
                                            <TextField 
                                                label="Specialisation"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder='e.g. :- Computer Science and Engineering'
                                                name={`education[${index}].specialisation`}
                                                error={Boolean(touched.education?.[index]?.specialisation) && Boolean(errors.education?.[index]?.specialisation)}
                                                helperText={touched.education?.[index]?.specialisation && errors.education?.[index]?.specialisation}
                                                sx={{
                                                    gridColumn:"span 2"
                                                }}
                                            />




                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Starting Date"
                                                    value={values.education[index].start}
                                                    onChange={(date) => setFieldValue(`education[${index}].start`, date)}
                                                    onBlur={() => setFieldTouched(`education[${index}].start`)}
                                                    slotProps={{
                                                        textField: {
                                                        error: Boolean(touched.education?.[index]?.start) && Boolean(errors.education?.[index]?.start),
                                                        helperText: touched.education?.[index]?.start && errors.education?.[index]?.start
                                                        },
                                                    }}
                                                    format="DD/MM/YYYY"
                                                    sx={{
                                                        gridColumn: 'span 2',
                                                    }}
                                                />

                                                <DatePicker
                                                    label="Ending Date"
                                                    value={values.education[index].end}
                                                    onChange={(date) => setFieldValue(`education[${index}].end`, date)}
                                                    onBlur={() => setFieldTouched(`education[${index}].end`)}
                                                    slotProps={{
                                                        textField: {
                                                        error: Boolean(touched.education?.[index]?.end) && Boolean(errors.education?.[index]?.end),
                                                        helperText: touched.education?.[index]?.end && errors.education?.[index]?.end
                                                        },
                                                    }}
                                                    format="DD/MM/YYYY"
                                                    sx={{
                                                        gridColumn: 'span 2',
                                                    }}
                                                />
                                            </LocalizationProvider>





                                            <TextField 
                                                label="Institution"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder='e.g. :- Academy of Technology'
                                                name={`education[${index}].school`}
                                                error={Boolean(touched.education?.[index]?.school) && Boolean(errors.education?.[index]?.school)}
                                                helperText={touched.education?.[index]?.school && errors.education?.[index]?.school}
                                                sx={{
                                                    gridColumn:"span 4"
                                                }}
                                            />


                                            <Button fullWidth onClick={()=>remove(index)} variant="outlined" color="error"
                                                disabled={values.education.length<2}
                                                sx={{
                                                    gridColumn:"span 4"
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    ))}
                                    <div style={{ textAlign: 'center', marginTop:"2rem" }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                // color:"#0f52ba",
                                                // backgroundColor:"#fff",
                                                "&:hover":{backgroundColor:"#2875EE", color:"#fff"},
                                                marginBottom:"2rem",
                                                p:"1rem",
                                            }}
                                            onClick={()=>push({school:"",degree:"",specialisation:"",start:null,end:null})}
                                        >
                                            Add another education
                                        </Button>
                                    </div>
                                </>
                            )}
                        </FieldArray>


                        <FormControl fullWidth sx={{marginTop:"2rem"}}>
                            <InputLabel id="experienced-select-label">Experienced</InputLabel>
                            <Select
                            labelId="experienced-select-label"
                            id="experienced-select"
                            value={values.experienced}
                            name='experienced'
                            label="Experienced"
                            onChange={handleChange}
                            error={Boolean(touched.experienced) && Boolean(errors.experienced)}
                            >
                            <MenuItem value={"YES"}>YES</MenuItem>
                            <MenuItem value={"NO"}>NO</MenuItem>
                            </Select>
                            <FormHelperText sx={{color:"#d32f2f"}}>
                                {touched.experienced && errors.experienced}
                            </FormHelperText>
                        </FormControl>



                        {values.experienced && values.experienced==='YES' && (
                            <>
                                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{
                                    "& > div" : {gridColumn: isNonMobileScreens ? undefined : "span 4"}, marginTop:"2rem"
                                }}>
                                    <FormControl sx={{ gridColumn: 'span 2'}}>
                                        <InputLabel id="yoe-select-label">YOE</InputLabel>
                                        <Select
                                        labelId="yoe-select-label"
                                        id="yoe-select"
                                        value={values.yoe}
                                        name='yoe'
                                        label="YOE"
                                        onChange={handleChange}
                                        >
                                        {[...Array(41).keys()].map((index) => (
                                            <MenuItem key={index} value={index}>
                                            {index}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{ gridColumn: 'span 2'}}>
                                        <InputLabel id="moe-select-label">MOE</InputLabel>
                                        <Select
                                        labelId="moe-select-label"
                                        id="moe-select"
                                        value={values.moe}
                                        name='moe'
                                        label="MOE"
                                        onChange={handleChange}
                                        >
                                        {[...Array(12).keys()].map((index) => (
                                            <MenuItem key={index} value={index}>
                                            {index}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </Box>







                                <FieldArray
                                    name="work"
                                >
                                    {({push,remove})=>(
                                        <>
                                            <div style={{ textAlign: 'center', marginTop:"2rem" }}>
                                                <Typography
                                                    fontWeight="bold"
                                                    sx={{
                                                        display: 'inline-block',
                                                    }}
                                                >
                                                    Add your work experience
                                                </Typography>
                                            </div>
                                            {values.work && values.work.map((_,index)=>(
                                                <Box key={index} display="grid" gap="30px" gridTemplateColumns="repeate(4,minmax(0, 1fr))" sx={{
                                                "& > div" : {gridColumn: isNonMobileScreens ? undefined : "span 4"},  marginTop:"1rem"}}
                                                >
                                                    <TextField 
                                                        label="Organisation"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder='e.g. :- Google'
                                                        name={`work[${index}].organisation`}
                                                        error={Boolean(touched.work?.[index]?.organisation) && Boolean(errors.work?.[index]?.organisation)}
                                                        helperText={touched.work?.[index]?.organisation && errors.work?.[index]?.organisation}
                                                        sx={{
                                                            gridColumn:"span 4"
                                                        }}
                                                    />

                                                    <TextField 
                                                        label="Job Post"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder='e.g. :- SDE1, SDE2'
                                                        name={`work[${index}].jobPost`}
                                                        error={Boolean(touched.work?.[index]?.jobPost) && Boolean(errors.work?.[index]?.jobPost)}
                                                        helperText={touched.work?.[index]?.jobPost && errors.work?.[index]?.jobPost}
                                                        sx={{
                                                            gridColumn:"span 4"
                                                        }}
                                                    />

                                                    <TextField 
                                                        label="Top Skills required in this job"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder='e.g. :- C++, React...'
                                                        name={`work[${index}].topSkill`}
                                                        error={Boolean(touched.work?.[index]?.topSkill) && Boolean(errors.work?.[index]?.topSkill)}
                                                        helperText={touched.work?.[index]?.topSkill && errors.work?.[index]?.topSkill}
                                                        sx={{
                                                            gridColumn:"span 4"
                                                        }}
                                                    />



                                                    <FormControl fullWidth sx={{gridColumn:"span 4"}}>
                                                        <InputLabel id="current-select-label">Still working hare</InputLabel>
                                                        <Select
                                                        labelId="current-select-label"
                                                        id="current-select"
                                                        value={values.work[index].current}
                                                        name={`work[${index}].current`}
                                                        label="Still working hare"
                                                        onChange={handleChange}
                                                        >
                                                        <MenuItem value={"Yes"}>YES</MenuItem>
                                                        <MenuItem value={"No"}>NO</MenuItem>
                                                        </Select>
                                                    </FormControl>



                                                    {values.work[index].current  &&(
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                label="Starting Date"
                                                                value={values.work[index].start}
                                                                onChange={(date) => setFieldValue(`work[${index}].start`, date)}
                                                                onBlur={() => setFieldTouched(`work[${index}].start`)}
                                                                // slotProps={{
                                                                //     textField: {
                                                                //     error: Boolean(touched.work?.[index]?.start) && Boolean(errors.work?.[index]?.start),
                                                                //     helperText: touched.work?.[index]?.start && errors.work?.[index]?.start
                                                                //     },
                                                                // }}
                                                                format="DD/MM/YYYY"
                                                                sx={{
                                                                    gridColumn: 'span 2',
                                                                }}
                                                            />

                                                            <DatePicker
                                                                label="Ending Date"
                                                                value={values.work[index].end}
                                                                onChange={(date) => setFieldValue(`work[${index}].end`, date)}
                                                                onBlur={() => setFieldTouched(`work[${index}].end`)}
                                                                // slotProps={{
                                                                //     textField: {
                                                                //     error: Boolean(touched.work?.[index]?.end) && Boolean(errors.work?.[index]?.end),
                                                                //     helperText: touched.work?.[index]?.end && errors.work?.[index]?.end
                                                                //     },
                                                                // }}
                                                                format="DD/MM/YYYY"
                                                                sx={{
                                                                    gridColumn: 'span 2',
                                                                }}
                                                                disabled = {values.work[index].current==="Yes"}
                                                            />
                                                        </LocalizationProvider>
                                                    )}







                                                    <Button fullWidth onClick={()=>remove(index)} variant="outlined" color="error"
                                                        disabled={values.work.length<2}
                                                        sx={{
                                                            gridColumn:"span 4"
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Box>
                                            ))}
                                            <div style={{ textAlign: 'center', marginTop:"2rem" }}>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{
                                                        // color:"#0f52ba",
                                                        // backgroundColor:"#fff",
                                                        "&:hover":{backgroundColor:"#2875EE", color:"#fff"},
                                                        marginBottom:"2rem",
                                                        p:"1rem",
                                                    }}
                                                    onClick={()=>push({organisation:"",topSkill:"",current:"",start:null,end:null})}
                                                >
                                                    Add another work experience
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </FieldArray>










                            </>
                        )}





                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m:"2rem 0",
                                    p:"1rem",
                                    backgroundColor:"#0f52ba",
                                    color:"#fff",
                                    "&:hover":{color:"#0f52ba"}
                                }}
                            >
                                {"SINGUP"}
                            </Button>

                            <Typography
                                onClick={()=>{
                                {registerPage("login")}
                                resetForm()
                                } }
                                sx={{
                                    textDecoration:"underline",
                                    color:"#0f52ba",
                                    "&:hover":{
                                        cursor:"pointer",
                                        color:"rgba(15, 82, 186,0.1)"
                                    }
                                }}
                            >
                                {"Already have an account? Sing in here "}
                            </Typography>


                        </Box>


                    </Form>
                )}
            </Formik>
        )}
    </>
    
  )
}

export default FormPage