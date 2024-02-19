import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title:String,
        description:String,
        price:Number,
        imagelink:String,
        published:Boolean
    }
)

const adminSchema = new mongoose.Schema(

    {
        
        username:String,
        password:String,
        role:String
        
    }
)

const userSchema = new mongoose.Schema(
    {
        
        username:String,
        password:String,
        role:String,
        purchasedCourses:[{type: mongoose.Schema.Types.ObjectId, ref:'Course'}]
    }
)

export const Course = mongoose.model('Course', courseSchema)
export const Admin = mongoose.model('Admin', adminSchema)
export const User = mongoose.model('User', userSchema)