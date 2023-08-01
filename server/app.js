import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
// import routes
import AuthRoute from './route/AuthRoute.js'




const app = express()


app.use(cors())
dotenv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    app.listen(5000,()=>{
        console.log("server connected")
    })
}).catch((er)=>{
    console.log(er)
})

// routes
app.use('/api',AuthRoute)