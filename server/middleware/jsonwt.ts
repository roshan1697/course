import jwt from 'jsonwebtoken'
import { SECRET } from '../config.js'
import { NextFunction, Request, Response } from 'express'

const authJwt = (req:Request,res:Response,next:NextFunction) => {
    const authheader = req.headers.authorization
    if(authheader) {
        const token = authheader.split(' ')[1]
        jwt.verify(token, SECRET, (err,user)=>{
            if(err) {
                return res.sendStatus(403)
            }
            if(!user){
                return res.sendStatus(403)
            }
            if(typeof user === 'string'){
                return res.sendStatus(403)
            }
            req.headers['user'] = user.username
            next()
        })
    } else {
        res.sendStatus(401)
    }

}
 export default authJwt