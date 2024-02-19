import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
    {
        title:String,
        description:String,
        price:Number,
        imagelink:String,
        published:Boolean
    }
)

const adminSchema = mongoose.Schema(

    {
        
        username:String,
        password:String,
        role:String
        
    }
)

const userSchema = mongoose.Schema(
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