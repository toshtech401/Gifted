require("dotenv").config()
const {verifyPayment, calculateNextPayment} = require('../Controller/Payment');
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passport = require('passport');
const UserModel = require('../Model/User');
const referralModel = require('../Model/referral')
const planModel = require('../Model/Plan');

const CreateAccount = async (req, res) => {
    const createPlan = async (planType) => {
        const prices = {
            weekly: 2400,
            monthly: 4600
        };
    
        if (prices[planType]) {
            await planModel.create({
                plan_type: planType,
                price: prices[planType]
            });
        }
    };
    const { plan_type, username, password, email, confirmPassword } = req.body;

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new UserModel({
            email,
            username,
            password: hashedPassword,
            confirmPassword,
            plan_type,
            referralCode:req.user,
            isPaid: true
        });

        const createReferral = (referrer, referred) => {
            return new referralModel({
                referrer: referrer._id,
                referred: referred._id,
                paymentMade: false
            });
        };

        const currentDate = Date.now();
        const nextPaymentDate = await calculateNextPayment(plan_type.name, currentDate);

        UserModel.register(newUser, password, function(err){
                    if(err){
                        console.log(err);
                    }
                    passport.authenticate('local')(req,res, function(err){
                        res.json({msg: 'Signed Up Successfully'})
                    })
                })
    }catch (error) {
        console.error('Error in CreateAccount:', error);
        res.json({ error: 'Error while signing up new user' });
        }
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
                res.json({msg: 'Login Successfully'})
            })
        })
    }

    const Logout = async(req,res)=>{
        req.logout(function(err){
            if(err){
                return res.json(err)
            }
            res.json({msg: 'Logout Successfully'})
        })
    }

module.exports = {CreateAccount, Login, Logout}