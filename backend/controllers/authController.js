const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const handleLogin=async(req,res)=>{

    const {email,password} = req.body
    if(!email || !password) return res.status(400).json({"error":"email and password are required"})
    const foundUser = await User.findOne({email:email}).exec()
    if(!foundUser) return res.status(401).json({"error":"User is not available"})
    if(foundUser.userStatus.status === "Pending") return res.status(401).json({"error":"Please Active your accoung before login"})
    const match = await bcrypt.compare(password,foundUser.password)
    if(!match) return res.status(401).json({"error":"Wrong password entered."})
    
    const roles = Object.values(foundUser.roles).filter(Boolean)
    const accessToken = jwt.sign(
        {"userInfo":{
            user:foundUser.first_name + ' ' + foundUser.last_name,
            email:foundUser.email,
            roles:roles
        }},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"50s"}
    )
    const refreshToken = jwt.sign(
        {"email":email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"1d"}
    )
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result);
    console.log(roles);

    res.cookie('jwt',refreshToken,{
        httpOnly:true,
        maxAge:24 * 60 * 60 * 1000,
        sameSite:'None',
        secure:true
    })
    res.status(200).json({roles,accessToken})
    
}
module.exports = {handleLogin}