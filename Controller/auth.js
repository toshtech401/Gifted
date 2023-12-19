require("dotenv").config()
const {verifyPayment, calculateNextPayment} = require('../Controller/Payment');
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passport = require('passport');
const UserModel = require('../Model/User');
// const plan = require('../Model/Plan');
const planModel = require('../Model/Plan');


const CreateAccount = async(req, res)=>{

    const {plan_type} = req.body;
    if(!plan_type){
        return res.json({error: "Plan Type is required to continue!"})
    }
    const {username, password, email, confirmPassword} = req.body

    if(password !== confirmPassword) return res.json({error: "password does not match!"})
    if(!username || !email) return res.json({error: "All fieds are required!"})

    const existingUser = await UserModel.findOne({email});
    if(existingUser) return res.json({error: "User already exist, pls sign in to continue!"})

    if(plan_type === 'weekly'){
        await planModel.create({
            plan_type,
            price: 2400
        })
    }
    if(plan_type === 'monthly'){
        await planModel.create({
            plan_type,
            price: 4600
        });
    }

    // const {reference} = req.body

    // const verifyPayment = await fetch(`https://api.paystack.co/transaction/verify/${reference}`,{
    //     headers: {
    //         Authorization: process.env.PAYSTACK_SECRETE_KEY
    //       }
    // })
    // .then(res => res.json())

    // if(verifyPayment.status === true){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new UserModel({
            email:email,
            username:username,
            password:hashedPassword,
            confirmPassword,
            plan_type,
            isPaid: true
        })
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
    // }
    
    return res.json({error: "Error while signing new user"})

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

    // try{
    //     console.log('Plan Name:', req.body.plan);
    //     const {plan_type} = req.body;
    //     if(!plan_type){
    //     return res.json({error: "Plan Type is required to continue!"})
    //     // const findSelectedPlan = await plan.findOne(req.body.plan);
    //     // if(!findSelectedPlan){
    //     //     return res.status(400).json({error: 'invalid plan selected'})
    //     }else if(plan_type){
    //         const checkPayment = verifyPayment(req.body.reference);
    //         if(checkPayment){
    //             currentDate = Date.now();
    //             const nextPaymentDate = await calculateNextPayment(plan_type.name, currentDate);

    //             // console.log('Selected Plan:', plan_type);

    //             const existingUser = await UserModel.findOne({email:req.body.email});
    //             if(existingUser){
    //                 return res.status(409).json({error: 'User already exist'})
    //             }
    //             const salt = await bcrypt.genSalt(10);
    //             const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //             const {username, email, password, confirmPassword} = req.body;
    //             const createNewUser = new UserModel({
    //                 username:username,
    //                 email:email,
    //                 password:hashedPassword,
    //                 confirmPassword,
    //                 plan_type:plan_type
    //             })
    //             createNewUser.isPaid = true;
    //             createNewUser.next_PaymentDate = nextPaymentDate;
    //             const register = createNewUser.save();
    //             if(register){
    //                 return res.status(201).json({msg: `Account created successfully and Sub will expire by ${nextPaymentDate}`})
    //             }
    //         }
    //     }
    //     if(!checkPayment){
    //         return res.status(400).json({error: 'Oops! an error occur'})
    //     }
    // }catch(error){
    //     console.error('Error:', error);
    //     return res.status(500).json({error: 'Error while signing new user'})
    // }
// }


module.exports = {CreateAccount, Login, Logout}