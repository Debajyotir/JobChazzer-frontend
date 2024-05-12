import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { addSearchValues } from '../store/search/searchSlice';
import { useNavigate } from 'react-router-dom';

const searchInitialValues ={
    skill:"",
    yoe:0,
}

const searchSchema = yup.object().shape({
    skill:yup.string().required("Skill is required"),
})

const Search = ({openSearch,setOpenSearch}) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        setOpenSearch(false);
    }

    const handleSearch = (values,onSubmitProps) => {
        dispatch(addSearchValues(values));
        setOpenSearch(false);
        navigate("/search");
        onSubmitProps.resetForm();
    }
    
    if(!openSearch)
        return null;
  return (
    <Dialog onClose={handleClose} open={openSearch}>
        <div className="flex flex-col py-4 px-8 bg-white rounded-xl gap-2 md:w-[30rem] sm:w-[24rem] w-[19rem]">

       

            <div className="flex flex-row justify-end">
                <Button variant="text" sx={{color: "#2875EE"}} onClick={handleClose}>
                    <CloseIcon/>
                </Button>
            </div>

            <div className="border-[1px] border-[#2875EE]" />
        
            <div className="text-black flex flex-col">

                <h4 className="font-extrabold mb-4">
                    Search Your Dream Job
                </h4>

                <Formik
                    initialValues={searchInitialValues}
                    validationSchema={searchSchema}
                    onSubmit={handleSearch}
                >
                    {({values,errors, touched, handleBlur, handleChange,resetForm})=>(
                        <Form>
                            <Box display="grid" gap="30px" gridTemplateColumns="repeate(4,minmax(0, 1fr))" sx={{
                                "& > div" : {gridColumn: isNonMobileScreens ? undefined : "span 4"}
                                }}
                            >
                                
                                <TextField 
                                    label="Skills"
                                    name="skill"
                                    placeholder='e.g. :- C++, Java, React'
                                    // value={values.skill}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.skill) && Boolean(errors.skill)}
                                    helperText={touched.skill && errors.skill}
                                    sx={{
                                        gridColumn:"span 4"
                                    }}
                                />

                                <FormControl sx={{ gridColumn: 'span 4'}}>
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

                            </Box>

                            <Box>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="outlined"
                                    sx={{
                                        m:"2rem 0",
                                        p:"1rem",
                                        "&:hover":{backgroundColor:"#2875EE", color:"#fff"},
                                        // backgroundColor:"#0f52ba",
                                        // color:"#fff",
                                    }}
                                >
                                    Search
                                </Button>
                            </Box>


                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    </Dialog>
  )
}

export default Search;