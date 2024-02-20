import { Card, Button, CardContent, CardMedia, Checkbox,Box, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import NavBar from "../components/navbar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const CourseEditPage = () => {
    const {id} = useParams()
    const [course,setCourse] = useState(null)

    
    useEffect(()=>{
        axios.get('http://localhost:3000/admin/courses/course/'+id,{
            headers:{
                Authorization:'bearer ' + localStorage.getItem('token')
            }
        }).then(res=>{
            setCourse(res.data.course)
            
        })
    },[])

    if (!course) {
        return (
            <div>
                Loading....
            </div>
        )
    }
    
    return (
    <div>
        <NavBar/>
        <EditSection course={course} setCourse={setCourse}/>

    </div>
    )
}

export default CourseEditPage

const EditSection = (course,{setCourse}) =>{
    
    const {id} = useParams()

    const [title,setTitle] = useState(course.course.title)
    const [description,setDescription] = useState(course.course.description)
    const [imagelink,setImageLink] = useState(course.course.imagelink)
    const [price,setPrice] = useState(course.course.price)
    const [publish,setPublish] = useState(course.course.published)
    
    const handleClick = async() =>{
        axios.put('http://localhost:3000/admin/courses/'+ id,{
            title:title,
            description:description,
            imagelink:imagelink,
            price:price,
            published:publish
        },{
            headers:{
                Authorization:'Bearer '+ localStorage.getItem('token')
            }
        })
        const updatedCourse = {
            title:title,
            description:description,
            imagelink:imagelink,
            price:price,
            published:publish
        }
        setCourse(updatedCourse)
    }
    return (
        
            <Grid container >
                <Grid item  xs={12} md={8}
                    style={{
                        display:'flex',
                        justifyContent:'center'
                    }}>
                    <Card style={{
                        padding:20,
                        width:'70%',
                        marginTop:30
                    }}>

                    <Typography variant="h5" style={{marginBottom:10}}>Update course</Typography>
                    <TextField required 
                    style={{marginBottom:10}}
                    fullWidth={true}
                    value={title}
                    variant="outlined"
                    label='title'
                    onChange={e=>{
                        setTitle(e.target.value)
                    }}
                    />
                    <TextField required multiline 
                    value={description}
                    fullWidth={true}
                    label='description'

                    onChange={e=>{
                        setDescription(e.target.value)
                    }}
                    style={{marginBottom:10}}
                    rows={4}
                    />
                    <TextField
                    fullWidth={true}
                    style={{marginBottom:10}}
                    value={imagelink}
                    onChange={e=>{
                        setImageLink(e.target.value)
                    }}
                    label='ImageURL'/>
                    <TextField 
                    label='Price'
                    value={price}
                    onChange={e=>{
                        setPrice(e.target.value)
                    }}
                    fullWidth={true}
                    style={{marginBottom:10}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    />
                    <Box style={{
                        display:'flex',
                        alignItems:'center',
                        marginBottom:10
                    }}>

                    <Checkbox defaultChecked />
                    <Typography style={{
                        textAlign:'center'
                    }}>Published</Typography>
                    </Box>
                    <Button size="large" 
                    onClick={handleClick}
                    style={{backgroundColor:'blue', color:'white'
                    }}>Add course</Button>
                </Card>
                </Grid>
                <Grid item xs={12} md={4} style={{
                    display:'flex',
                    justifyContent:'center'
                }}>
                <Card sx={{  marginTop:6 }}>
                <CardMedia
                sx={{ height: 250 , width:300 }}
                image="https://images.inc.com/uploaded_files/image/1920x1080/getty_933383882_2000133420009280345_410292.jpg"
                title="course"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {description}
                </Typography>
                <Typography  variant="h6" >
                {price}
                </Typography>
                </CardContent>
                
                </Card>

                </Grid>
            </Grid>
        
    )
}