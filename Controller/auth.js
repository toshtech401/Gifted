const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passport = require('passport');
const UserModel = require('../Model/User');

const SignUp = async (req,res)=>{
    const {username, email, password, confirmPassword, planType} = req.body;

    if(!username){
        return res.json({error: 'Username is required'})
    }
    if(!email){
        return res.json({error: 'Email is required'})
    }
    if(!password){
        return res.json({error: 'Password is required'})
    }
    if(password !== confirmPassword){
        return res.json({error: 'Password do not match'})
    }
    if(!['weekly', 'monthly'].includes(planType)){
        return res.json({error: 'Invalid plan type'})
    }
    const existingUser = await UserModel.findOne({email})
    if(existingUser){
        return res.json({error: 'User already exist'})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserModel({
        email:email,
        username:username,
        password:hashedPassword,
        isAdmin:false,
        planType,
    })
    UserModel.register(newUser, password, function(){
        if(err){
            console.log(err);
        }
        password.authenticate('local')(req,res, function(err){
            res.json({msg: 'Signed Up Successfully'})
        })
    })
}

module.exports = {SignUp}