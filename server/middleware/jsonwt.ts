import jwt from 'jsonwebtoken'
import { SECRET } from '../config.js'

const authJwt = (req,res,next) => {
    const authheader = req.headers.authorization
    if(authheader) {
        const token = authheader.split(' ')[1]
        jwt.verify(token, SECRET, (err,user)=>{
            if(err) {
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }

}
 export default authJwt