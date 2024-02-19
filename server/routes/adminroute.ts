import express from "express"
import {Course , Admin} from "../modal/coursemodal.js"
import  jwt  from "jsonwebtoken"
import { SECRET } from "../config.js"
import authJwt from "../middleware/jsonwt.js"

const router = express.Router()

router.get('/me',authJwt ,async(req,res)=>{
    const admin = await Admin.findOne({username:req.headers['user']})
        
        if(admin){

            res.json({
                username:admin.username,
                role:admin.role
            })
        }
})

router.post('/signup', async(req ,res)=>{
    const { username, password } = req.body
    const admin = await Admin.findOne({ username})
    if (admin) {
        res.status(403).json({ message: 'Admin already exists' })
    }
    const newAdmin = new Admin({ username: username, password: password, role:'admin' });
    await newAdmin.save()
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' })
    res.json({ message: 'Admin created successfully', token })

})

router.post('/login', async (req, res) => {
    const { username, password } = req.headers
    const admin = await Admin.findOne({ username, password })
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' })
        res.json({ message: 'Logged in successfully', token })
    } 
    res.status(403).json({ message: 'Invalid username or password' })
    
})

router.post('/course', authJwt, async (req, res) => {
    const course = new Course(req.body)
    await course.save()
    res.json({ message: 'Course created successfully'})
})

router.put('/courses/:courseId', authJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true })
    if (course) {
        res.json({ message: 'Course updated successfully' })
    }else {

        res.status(404).json({ message: 'Course not found' })
    }
    
})

router.get('/courses/course/:courseId', authJwt , async (req,res) => {
    const course = await Course.findById(req.params.courseId)
    if (course) {
        res.json({course})
    }else {

        res.status(404).json({ message: 'Course not found' })
    }
})

router.get('/courses', authJwt, async (req, res) => {
    const courses = await Course.find({})
    res.json({ courses })
})


export default router