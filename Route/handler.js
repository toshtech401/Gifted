const express = require('express');
const { Login, Logout, CreateAccount, test } = require('../Controller/auth');
const { contactForm } = require('../Controller/Contact');
const { createQuestion, getAllQuestion, getQuestion, answeredQuestion, } = require('../Controller/QuizController');
const { verifyAccount, WithdrawFunds } = require('../Controller/WithdrawController');
const { initializeAndRedirect, fundWallet } = require('../Controller/WalletController');
const { home, signUp, signIn, dashboard, gethelp, getsupport, congratulation, payment, planpage, referral, spin } = require('../Controller/Controller');





const router = express.Router()

router.route('/').get(home)
router.route('/gethelp').get(gethelp)
router.route('/congratulation').get(congratulation)
router.route('/payment').get(payment)
router.route('/planpage').get(planpage)
router.route('/referral').get(referral)
router.route('/spin').get(spin)
router.route('/getsupport').get(getsupport)
router.route('/sign-up').get(signUp)
router.route('/sign-in').get(signIn)
router.route('/dashboard').get(dashboard)
router.route('/register').post(CreateAccount)
router.route('/login').post(Login)
router.route('/logout').get(Logout)
router.route('/contact').post(contactForm)
router.route('/create-quiz').post(createQuestion)
router.route('/get-quiz').get(getAllQuestion)
router.route('/quiz/:id').get(getQuestion)
router.route('/answered/:id').post(answeredQuestion)
router.route('/verify-account').post(verifyAccount)
router.route('/withdrawal').post(WithdrawFunds)
router.route('/initialize').post(initializeAndRedirect)
router.route('/fund-wallet').post(fundWallet)
router.route('/test').get(test)

module.exports = router;