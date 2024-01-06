require("dotenv").config()
const {verifyPayment, calculateNextPayment} = require('../Controller/Payment');
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passport = require('passport');
const UserModel = require('../Model/User');
const referralModel = require('../Model/referral')
const Wallet = require("../Model/Wallet");
const baseUrl = process.env.base_url;

const CreateAccount = async (req, res) => {

    const { plan_type, username, password, email, confirmPassword } = req.body;
    const {ref} = req.query;
    try {
        if (!plan_type) {
            return res.json({ error: 'Plan Type is required to continue!' });
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

        const refLink = `${baseUrl}/sign-up?ref=${username}`


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const referrer = await UserModel.findOne({referralCode: ref})
        if(!referrer){


        const newUser = new UserModel({
            email,
            username : username.toLowerCase(),
            password: hashedPassword,
            plan_type,
            referralCode:username,
            isPaid: false,
            referral_link: refLink
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

        return UserModel.register(newUser, password, function(err){
                    if(err){
                        console.log(err);
                    }
                    passport.authenticate('local')(req,res, function(err){
                        res.json({msg: 'Signed Up Successfully'})
                    })
                })
            }else{

                const newUser = new UserModel({
                    email,
                    username : username.toLowerCase(),
                    password: hashedPassword,
                    plan_type,
                    referralCode:username,
                    isPaid: false,
                    referral_link: refLink
                });

                 await referralModel.create({
                    referedBy: referrer.username,
                    referred: newUser._id,
                    paymentMade: true,
                  });

                  const commission = await referralModel.findOne({referedBy : referrer.username});

                  if(commission){
                    commission.referralCommission +=200;
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

                  return UserModel.register(newUser, password, function(err){
                    if(err){
                        console.log(err);
                    }
                    passport.authenticate('local')(req,res, function(err){
                        return res.redirect('/sign-in')
                    })
                })
            }
    }catch (error) {
        console.error('Error in CreateAccount:', error);
        res.json({ error: 'Error while signing up new user' });
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