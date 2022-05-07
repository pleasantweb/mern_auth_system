const jwt = require('jsonwebtoken')

const verifyJWT = async (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader) return res.sendStatus(401)
    console.log(authHeader);
     const token =  authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.sendStatus(403)
            req.user = decoded.userInfo.email
            next()
        }
    )
    next()
}

module.exports = verifyJWT