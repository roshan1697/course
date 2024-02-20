import { Alert, Box, Button, Card, Checkbox, InputAdornment, TextField, Typography } from "@mui/material"
import NavBar from "../components/navbar"
import { useState } from "react"
import axios from "axios"


const CourseAddPage = () => {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [imageURL,setImageURL] = useState('')
    const [price,setPrice] = useState(0)
    const [publish, setPublish] = useState(true)

    

    const handleClick = async() =>{
        try {

            await axios.post('http://localhost:3000/admin/course',{
                title: title,
                description:description,
                imagelink:imageURL,
                price:price,
                published:publish
            },{
                headers:{
                    'Authorization':'Bearer ' + localStorage.getItem('token')
                }
            })
                
        }
        catch(err){
            console.log(err)
        }
}
    

  return (
    <>
    <NavBar/>
    <div style={{
        display:'flex', justifyContent:'center'
    }}>
    <Card style={{
                        padding:20,
                        width:'50vw',
                        marginTop:50
                    }}>

                    <Typography variant="h5" style={{marginBottom:10}}>Add course</Typography>
                    <TextField required 
                    style={{marginBottom:10}}
                    fullWidth={true}
                    label='Title'
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                    />
                    <TextField required multiline 
                    label='Description'
                    fullWidth={true}
                    style={{marginBottom:10}}
                    rows={4}
                    onChange={(e)=>{
                        setDescription(e.target.value)
                    }}
                    />
                    <TextField
                    fullWidth={true}
                    style={{marginBottom:10}}
                    label='ImageURL'
                    onChange={(e)=>{
                        setImageURL(e.target.value)
                    }}
                    />
                    <TextField 
                    label='Price'
                    fullWidth={true}
                    style={{marginBottom:10}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    onChange={(e)=>{
                        setPrice(e.target.value)
                    }}
                    />
                    <Box style={{
                        display:'flex', alignItems:'center',
                        marginBottom:10
                    }}>

                    <Checkbox defaultChecked 
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    onChange={(e)=>{setPublish(e.target.checked)}}
                    />
                    <Typography  style={{
                        textAlign:'center', fontSize: 22
                    }}>Publish</Typography>
                    </Box>
                    <Button size="large" 
                    onClick={handleClick}
                    style={{backgroundColor:'blue', color:'white'
                    }}>Add course</Button>
                </Card>
            
    </div>
    </>
  )
}

export default CourseAddPage