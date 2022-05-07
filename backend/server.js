require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const connectDB = require('./config/dbConn');
const verifyJWT = require('./middlewares/verifyJWT');
const app = express()
const PORT = process.env.PORT || 3500
connectDB()

const whiteList = ['http://localhost:3000']
const corsOptions = {
    origin:(origin,callback)=>{
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('Not Allowed by cors'))
        }
    },
    credentials: true,
    // allowedHeaders: ['Content-Type', 'authorization'],
    optionSuccessStatus:200
}

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/register',require('./routes/api/register'))
app.use('/activate',require('./routes/api/activate'))
app.use('/resendactive',require('./routes/api/resendactivate'))
app.use('/auth',require('./routes/api/auth'))
app.use('/verify',require('./routes/api/verify'))
app.use('/refresh',require('./routes/api/refresh'))
app.use('/logout',require('./routes/api/logout'))

app.use(verifyJWT)
app.get('/',(req,res)=>{
    res.send('Hello world')
})

mongoose.connection.once('open',()=>{
    console.log('Connected to mongodb');
    app.listen(PORT,()=>{
        console.log(`App is listening at port ${PORT}`);
    })
})
