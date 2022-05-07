const User = require('../model/User')
const bcrypt = require('bcrypt')
const { sendConfirmationCode } = require('../config/confirmCode');


const handleNewUser = async(req,res)=>{
    console.log(req.body);
   const {first_name,last_name,email,password} = req.body
   if(!email || !password) return res.status(400).json({"message":"Email and Password are required"})
  
   const duplicate = await User.findOne({email:email}).exec()
   if(duplicate) return res.status(409).json({"message":"Email is already in Use"})
   
   const confirmationCode = sendConfirmationCode(email,res) // Math.floor(Math.random()*90000) + 10000;

  
   try{
       const hashedPwd = await bcrypt.hash(password,10)
       const result = await User.create({
           "first_name":first_name,
           "last_name":last_name,
           "email":email,
           "password":hashedPwd,
           "userStatus":{
               "status":"Pending",
               "confirmationCode":confirmationCode
           }
       })
   
       console.log(result);
       res.status(201).json({"success":`New User with ${email} is created`})

   }catch(err){
    res.status(500).json({'error':err.message})
   }
}
module.exports = {handleNewUser}