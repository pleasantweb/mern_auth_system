const jwt = require('jsonwebtoken')
const User = require('../model/User')

const handleActivation =async(req,res)=>{
    const {activationCode} = req.body
    console.log(activationCode,typeof(activationCode));
   const cookies = req.cookies
   if(!cookies?.pending_user_email) return res.sendStatus(409)
   if(!cookies?.confirmation_code) return res.sendStatus(409)
   
   
   console.log(cookies.confirmation_code,cookies.pending_user_email);
   const userEmail = cookies.pending_user_email
   const confirmationCode = cookies.confirmation_code

   let check,email
   jwt.verify(
     userEmail,
     process.env.CONFIRM_CODE_TOKEN,
     (err,decoded)=>{
        if(err) return res.sendStatus(403)
        email = decoded.email
     }
   )
   jwt.verify(
       confirmationCode,
       process.env.CONFIRM_CODE_TOKEN,
       (err,decoded)=>{
           if(err) return res.sendStatus(403)
           check = decoded.code === activationCode
           
       }
   )
   if(!check) return res.status(401).json({"error":"Wrong Confirmaion code"})
   
   const user = await User.findOne({email:email}).exec()
   if(!user) return res.status(400).json({"error":"No User Found by this email"})
   user.userStatus.status = 'Active'
   user.userStatus.confirmationCode = ' '
   const updateUser = await user.save()
   
   res.clearCookie('pending_user_email',{
    httpOnly:true,
    sameSite:'None',
    secure:true // process.env.NODE_ENV === 'production'
   })
   console.log(updateUser);
   
   res.sendStatus(200)
}
module.exports = {handleActivation}