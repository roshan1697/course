import NavBar from '../components/navbar'
import Layout from '../components/layout'
import Footer from '../components/footer'
import LandingPage from '../components/landingpage'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [userEmail, setUserEmail] = useState(null)
  const [role,setRole] = useState('')
  
  const checkUser  = async() =>{
        try {
          const res = await axios.get('http://localhost:3000/user/me',{
            headers:{
              Authorization:'Bearer ' + localStorage.getItem('token')
            }
          })
          
          if(res.data.username){
            setUserEmail(res.data.username)
            setRole(res.data.role)
            
          }
        } catch(err){
          try{
            const response = await axios.get('http://localhost:3000/admin/me',{
      headers:{
        Authorization:'Bearer ' + localStorage.getItem('token')
      }
    })
    if(response.data.username){
      setUserEmail(response.data.username)
      setRole(response.data.role)
    }

          }catch(err){
            console.log(err)
          }

        }
      
    } 

    
    useEffect(()=>{
    
      checkUser()
  },[])

  return (
    <>
    <NavBar userEmail={userEmail} setUserEmail={setUserEmail}/>
    <LandingPage/>
    <Layout/>
    <Footer/>
    </>  
)
}

export default Home