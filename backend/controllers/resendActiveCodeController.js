const jwt = require('jsonwebtoken')
const { sendConfirmationCode } = require('../config/confirmCode')


const resendActiveCode=(req,res)=>{
    const cookies = req.cookies
    if(!cookies?.pending_user_email) return res.sendStatus(409)
    const userEmail = cookies.pending_user_email
    let email
    jwt.verify(
      userEmail,
      process.env.CONFIRM_CODE_TOKEN,
      (err,decoded)=>{
         if(err) return res.sendStatus(403)
         email = decoded.email
      }
    )
  const confirmationCode = sendConfirmationCode(email,res)
  if(!confirmationCode) return res.sendStatus(400)
  res.sendStatus(200)

}
module.exports = {resendActiveCode}