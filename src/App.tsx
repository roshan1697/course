
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import SignIn from './pages/signin'
import SignUp from './pages/signup'
import CoursePage from './pages/coursepage'
import CourseEditPage from './pages/courseeditpage'
import CourseAddPage from './pages/courseaddpage'
import Courses from './pages/courses'
import AdminSignin from './pages/adminsignin'
import AdminSignup from './pages/adminsignup'

function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/courseapp/signin' element={<SignIn/>}/>
      <Route path='/courseapp/signup' element={<SignUp/>}/>
      <Route path='/courseapp/courses/course/:id' element={<CoursePage/>}/>
      <Route path='/courseapp/course/edit/:id' element={<CourseEditPage/>}/>
      <Route path='/courseapp/course/add' element={<CourseAddPage/>}/>
      <Route path='/courseapp/courses' element={<Courses/>}/>
      <Route path='/courseapp/adminsignin' element={<AdminSignin/>}/>
      <Route path='/courseapp/adminsignup' element={<AdminSignup/>}/>




    </Routes>
    </>
  )
}

export default App
