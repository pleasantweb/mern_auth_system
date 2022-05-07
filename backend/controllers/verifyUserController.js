const jwt = require('jsonwebtoken')

const verifyUser =(req,res)=>{
    console.log( req.headers);
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader) return res.sendStatus(401)
    console.log(authHeader);
     const token =  authHeader.split(' ')[1]
     jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.sendStatus(403)
            const user = decoded.userInfo.user
            const email = decoded.userInfo.email
            return res.status(200).json({user,email})
           
        }
    )
}
module.exports = {verifyUser}