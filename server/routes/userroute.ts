import express from "express"
import {Course , User} from "../modal/coursemodal.js"
import  jwt  from "jsonwebtoken"
import { SECRET } from "../config.js"
import authJwt from "../middleware/jsonwt.js"

const router = express.Router()

router.get('/me',authJwt ,async(req,res)=>{
    const user = await User.findOne({username:req.headers['user']})
        if(user){

            res.json({
                username:user.username,
                role:user.role
            })
        }
        res.status(403).json({  username:null })

})

router.post('/signup',async(req,res)=>{
    const {username, password}= req.body
    const user = await User.findOne({username})
    if (user) {
        res.status(403).json({message: 'user already exists'})
    }
    const newUser = new User({username, password, role:'user'})
    await newUser.save()
    const token = jwt.sign({username, role: 'user'}, SECRET, {expiresIn: '1h'})
    res.json({message: 'user created successfully', token})
})


router.post('/login',async(req,res)=>{
    const {username, password}= req.body
    const user = await User.findOne({username, password})
    if (user) {
        const token = jwt.sign({user, role: 'user'},SECRET,{expiresIn: '1h'})
        res.json({message:'logged in successfully', token})
    }
    res.status(403).json({message: ' Invalid username or password'})
})  


router.get('/courses' ,async(req,res)=>{
    const course = await Course.find({published: true})
    res.json({course})
})

router.post('/courses/:courseId', authJwt,async(req,res)=>{
    const course = await Course.findById(req.params.courseId)
    if (course) {
        const user = await User.findOne({ username:req.headers['user']})
        if (user) {
            user.purchasedCourses.push(course)
            await user.save()
            res.json({message: 'course purchased successfully'})
        }
        res.status(403).json({message: ' user not found'})
    }
    res.status(404).json({message: 'course not found'})
})
router.get('/courses/course/:courseId', authJwt , async (req,res) => {
    const course = await Course.findById(req.params.courseId)
    if (course) {
        res.json({course})
    }else {

        res.status(404).json({ message: 'Course not found' })
    }
})
router.get('/purchasedcourses', authJwt,async(req,res)=>{
    const user = await User.findOne({username: req.headers['user']}).populate('purchasedCourses')
    if (user) {
        res.json({purchasedCourses: user.purchasedCourses || []})
    }
    res.status(403).json({message: ' user not found'})
})

export default router