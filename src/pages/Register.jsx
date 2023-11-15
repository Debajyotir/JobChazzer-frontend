import { Box, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import "../styles/register.scss"
import FormPage from '../components/Form';

const Register = () => {
    const [page,setPage] = useState('login');
    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");

    const registerPage = (regPage) =>{
        setPage(regPage);
    }
    
    
  return (
    <Box>
        <Box
            sx = {{
                width:"100%",
                boxSizing:"border-box",
                backgroundColor: "#FFFFFF",
                p:"1rem 2% 1rem 6%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <Typography
                fontWeight="bold"
                fontSize= {isNonMobileScreens ? "32px" : "25px"}
                color = "#0f52ba"
            >
                JobChazzer...
            </Typography>

            <Box
                display = "flex"
                flexDirection = "row"
            >
                <button onClick={()=>registerPage("singup")} className={page==="singup" ? isNonMobileScreens ? "login-active" :"login-active-mobile" : isNonMobileScreens ? "login-notactive" : "login-notactive-mobile"} style={{margin:"0 0.2rem"}}>SingUp</button>
                <button onClick={()=>registerPage("login")} className={page==="login" ? isNonMobileScreens ? "login-active" :"login-active-mobile" : isNonMobileScreens ? "login-notactive" : "login-notactive-mobile"}>SingIn</button>
            </Box>
        </Box>
        
        <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            boxSizing="border-box"
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor="#fff"
        >
            {/* <Typography fontWeight="500" variant="h5" sx={{mb:"1.5rem"}}>
                Welcome to JobChazzer, Where Opportunities Meet Aspirations !!
            </Typography> */}
            <FormPage page={page} registerPage={registerPage} />
        </Box>
    </Box>
  )
}

export default Register