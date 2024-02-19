import express from 'express'
import cors from 'cors'
import userRoute from './routes/userroute.js'
import adminRoute from './routes/adminroute.js'
import{PORT, mongoURL} from './config.js'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173'
}))
app.use('/user', userRoute)
app.use('/admin', adminRoute)

mongoose.connect(mongoURL).then(()=>{
    console.log('db connected')
})
app.listen(PORT, ()=> console.log('server running on port ' + PORT))