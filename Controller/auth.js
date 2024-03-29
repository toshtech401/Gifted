require("dotenv").config()
const {verifyPayment, calculateNextPayment} = require('../Controller/Payment');
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passport = require('passport');
const UserModel = require('../Model/User');
const referralModel = require('../Model/referral')
const Wallet = require("../Model/Wallet");
const Points = require("../Model/Points");
const baseUrl = process.env.base_url;

const CreateAccount = async (req, res) => {

    const { plan_type, username, password, email, confirmPassword, referralCode } = req.body;
    try {
        if (!plan_type) {
            return res.redirect("/sign-in")
        }

        if (password !== confirmPassword) {
            return res.json({ error: 'Password does not match!' });
        }

        if (!username || !email) {
            return res.json({ error: 'All fields are required!' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.json({ error: 'User already exists. Please sign in to continue!' });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        

        if(referralCode){
        const referrer = await referralModel.findOne({referralCode})
        
        if(referrer){
                const newUser = new UserModel({
                    email,
                    username : username.toLowerCase(),
                    password: hashedPassword,
                    plan_type,
                    referralCode:username.toLowerCase(),
                    isPaid: false,
                    referredBy : referrer._id
                });

                

                const commission = await referralModel.findOne({referralCode : referrer.referralCode});

                if(commission){
                    // commission.referralCommission += 200;
                    commission.status = 'pending'
                    commission.save()
                    .then()
                    .catch((err)=>{
                        next(err)
                    })
                }


                const userWallet = new Wallet({
                    user: newUser._id,
                });
                userWallet
                .save()
                .then()
                .catch((error)=>{
                    next(error);
                });

                const userPoints = new Points({
                    user: newUser._id,
                    points:0
                });
                userPoints
                .save()
                .then()
                .catch((error)=>{
                    next(error);
                });


                const userreferral = new referralModel({
                    user: newUser._id,
                    referralCommission: 0,
                    referralCode
                });
                userreferral
                .save()
                .then()
                .catch((error)=>{
                    next(error);
                });


                return UserModel.register(newUser, password, function(err){
                    if(err){
                        console.log(err);
                    }
                    passport.authenticate('local')(req,res, function(err){
                        return res.redirect('/makePayment')
                    })
                })
            
        }

        }

        const newUser = new UserModel({
            email,
            username : username.toLowerCase(),
            password: hashedPassword,
            plan_type,
            referralCode:username.toLowerCase(),
            isPaid: false,
        });

        const userWallet = new Wallet({
            user: newUser._id,
          });
          userWallet
          .save()
          .then()
          .catch((error)=>{
            next(error);
          });

        const userPoints = new Points({
            user: newUser._id,
            points:0,
        });
        userPoints
        .save()
        .then()
        .catch((error)=>{
            next(error);
        });

        const userreferral = new referralModel({
            user: newUser._id,
            referralCommission:0,
            referralCode
        });
        userreferral
        .save()
        .then()
        .catch((error)=>{
            next(error);
        });
        return UserModel.register(newUser, password, function(err){
                    if(err){
                        console.log(err);
                    }
                    passport.authenticate('local')(req,res, function(err){
                        return res.redirect('/makePayment')
                    })
                })

    }catch (error) {
        console.error('Error in CreateAccount:', error);
        res.json({ error : `Error in CreateAccount: ${error}`});
        }
}
const test = (req,res)=>{
    const {ip} = req.query;
    if(!ip){
        return res.json({msg : "Sign up without referral"})
    }
    return res.json({msg : "You ref by " + ip})
    
}

const Login = async(req,res)=>{
        const {username, password} = req.body;
        if(!username){
            res.json({error: 'username is required'})
        }
        if(!password){
            res.json({error: 'password is required'})
        }
        const existingUser = await UserModel.findOne({username})
        if(!existingUser){
            return res.json({error: 'User not found, please signup to continue'})
        }
        if (existingUser.is_paid === false) {
            return res.status(400).json({error: 'please subscribe to continue'})
        }
        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!passwordCorrect){
            return res.json({error: 'password is incorrect'})
        }
        const User = new UserModel({
            username,
            password
        })
        req.login(User, function(err){
            if(err){
                return res.json(err)
            }
            passport.authenticate('local')(req, res, function(){
                return res.redirect("/dashboard")
                // return res.json({msg:"logged in"})

                
            })
        })
    }

    const Logout = async(req,res)=>{
        req.logout(function(err){
            if(err){
                return res.json(err)
            }
            res.redirect("/sign-in")
        })
    }

module.exports = {CreateAccount, Login, Logout, test}   