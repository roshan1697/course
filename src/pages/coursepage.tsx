import axios from "axios"
import NavBar from "../components/navbar"
import { Box, Button, Grid, Typography } from '@mui/material'
import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

const CoursePage = () => {
    const {id} = useParams()
    const [course,setCourse] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/user/courses/course/'+id,{
            headers:{
                Authorization:'Bearer '+ localStorage.getItem('token')
            }
        }).then(res=>{
            setCourse(res.data.course)
        })
    },[])

    const handleClick = async() => {
        const res = await axios.post('http://localhost:3000/user/courses/'+id,{
            headers:{
                Authorization:'Bearer '+ localStorage.getItem('token')
            }
        })
    }
    
    return (
        <div>
        <NavBar/>
        <Box style={{
        padding:'2rem',
        
        }} >
        <Grid container  spacing={2}>
            <Grid item xs={12} md={8} style={{
                paddingTop:'15%'
            }}
            
            >

        <Typography style={{
        }} variant="h4">
                {course.title}
            </Typography>
            <Typography  style={{
                                marginTop:'1rem',

            }}>
            {course.description}
            </Typography>
            <Typography style={{
        }} variant="h4">
                {course.price}
            </Typography>
            
            <Button size="large"
            onClick={handleClick}
            style={{
                marginTop:'1rem',
                backgroundColor:'blue',
                color:'white'
                
            }}>Buy Now</Button>
            
            </Grid>
            <Grid item xs={12} md={4} style={{
                paddingTop:'10%'

            }}>
            
        <img src='https://images.inc.com/uploaded_files/image/1920x1080/getty_933383882_2000133420009280345_410292.jpg'
            
            width='100%' height='auto'/>
                
            </Grid>
        </Grid>
    </Box>


    </div>
)
}

export default CoursePage