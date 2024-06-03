import { Avatar, Box, Button, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import Search from './Search';
import { useDispatch } from 'react-redux';
import { removeToken } from '../store/login/loginSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
    const [openSearch,setOpenSearch] = useState(false);
    const location = useLocation();
    const hideNavbar = location.pathname.startsWith('/auth');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        setOpenSearch(true);
    }

    const handleLogOut = () => {
        try {
            dispatch(removeToken());
            navigate("/auth");
            toast.success("Logout successfully");
        } catch (error) {
            console.log(error);
            toast.success("Error while logout");
        }
    }

    if(hideNavbar)
        return null;
  return (
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
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
                fontWeight="bold"
                fontSize= {isNonMobileScreens ? "32px" : "22px"}
                color = "#0f52ba"
            >
                JobChazzer
            </Typography>
        </Link>

        <Box
            display = "flex"
            flexDirection = "row"
        >
            <Button variant="text" className="rounded-full" onClick={handleClick}>
                <SearchIcon/>
            </Button>

            <Button variant="text" onClick={handleLogOut}>
                <LogoutIcon/>
            </Button>

            <Link to="/profile" style={{ textDecoration: 'none' }}>
                <Button variant="text">
                    <Avatar src="/broken-image.jpg" sx={{ width: 30, height: 28, mt:0.6 }} />
                </Button>
            </Link>

        </Box>
        <Search openSearch={openSearch} setOpenSearch={setOpenSearch}/>
    </Box>
  )
}

export default Navbar;