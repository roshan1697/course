import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardLayout from './card';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Layout = () => {
    const [courses, setCourses] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000/user/courses'
        ).then((res)=>{
            setCourses(res.data.course)
        })
    },[])
    return (
    <Box style={{
        padding:'2rem'
    }}>
        <Typography style={{
            textAlign:'center',
            marginBottom:'2rem'
        }} variant='h3'>Courses</Typography>
    <Grid container style={{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center'
    }} sx={{ margin: { xs: 'auto'}}}>
        
        {courses.map((course, index) => (
            <Grid item style={{
                marginRight:'2rem',
                marginBottom:'2rem'
            }} key={index} >
                <CardLayout course={course}/>
            </Grid>
        ))}
    </Grid>
    </Box>
    )
}

export default Layout