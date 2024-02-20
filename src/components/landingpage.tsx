/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Grid, Typography } from '@mui/material'
import courseimage from '../assets/homepage.svg'
import {Link} from 'react-router-dom'
const LandingPage = () => {
  return (
    <Box style={{
        padding:'2rem',
        
    }} >
        <Grid container  spacing={2}>
            <Grid item xs={12} md={6} style={{
                paddingTop:'15%'
            }}
            
            >

        <Typography style={{
        }} variant="h4">
                Headline curve your Skill
                with Different Way
              </Typography>
              <Typography  style={{
                                marginTop:'1rem',

              }}>
              Let's take an online course to improve your skills in a different way,
               you can set your own study time according to your learning speed.
                 So you san study comfortable and absorb tge material easily.
              </Typography>
              <Link to='/courseapp/signin'>
              <Button size="large" style={{
                marginTop:'1rem',
                backgroundColor:'blue',
                color:'white'
              }}>Get Started</Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={6}>
           
        <img src={courseimage} alt="Your SVG" width='100%' height='auto'/>
              
            </Grid>
        </Grid>
    </Box>
  )
}

export default LandingPage