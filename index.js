require('dotenv').config()
const express = require('express')
const connectDb = require('./ConnectDb/connect')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const router = require('./Route/handler')
const ejs = require('ejs')

port = process.env.port || 9000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))


app.use(session({
    secret:'gifted_brainz',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 64000}
}))



app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)


app.set('view engine', 'ejs');




app.listen(port, ()=>{
    connectDb();
    console.log(`server started on  ${port}`)
})