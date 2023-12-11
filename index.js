require('dotenv').config()
const express = require('express')
const connectDb = require('./ConnectDb/connect')
const mongoose = require('mongoose')
const passport = require('passport')
const router = require('./Route/handler')

port = process.env.port || 9000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1', router)




app.listen(port, ()=>{
    connectDb();
    console.log(`server started on  ${port}`)
})