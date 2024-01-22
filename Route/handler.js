const express = require('express');
const { Login, Logout, CreateAccount, test } = require('../Controller/auth');
const { contactForm } = require('../Controller/Contact');
const { createQuestion, getAllQuestion, getQuestion, answeredQuestion, } = require('../Controller/QuizController');
const { verifyAccount, WithdrawFunds, fetchBanks } = require('../Controller/WithdrawController');
const { initializeAndRedirect, fundWallet } = require('../Controller/WalletController');
const { createCourse, getAllCourse } = require('../Controller/createCourse');
const { updateProfile } = require('../Controller/updateProfile');
const hasPaid = require("../MiddleWare/hasPaid")
const { home, signUp, signIn, dashboard, gethelp, getsupport, congratulation, payment, planpage, referral, spin, coursePage, leaderBoard, quizPage, quizSelection, setting, spinWheel, createQuiz, makePayment, confirmPayment, sidebar, withdraw } = require('../Controller/Controller');
const spintheWheel = require('../Controller/SpinController');



const router = express.Router()


router.route('/').get(home)
router.route('/sidebar').get(sidebar)
router.route('/gethelp').get(gethelp)
router.route('/congratulation').get(congratulation)
router.route('/createQuiz').get(createQuiz)
router.route('/payment').get(payment)
router.route('/planpage').get(planpage)
router.route('/referral').get(referral)
router.route('/getsupport').get([hasPaid],getsupport)
router.route('/sign-up').get(signUp)
router.route('/confirm-payment').post(confirmPayment)
router.route('/sign-in').get(signIn)
router.route('/makePayment').get(makePayment)
router.route('/dashboard').get([hasPaid], dashboard)
router.route('/spin').get([hasPaid],spin)
router.route('/coursepage').get([hasPaid],coursePage)
router.route('/leaderboard').get([hasPaid],leaderBoard)
router.route('/quizPage').get(quizPage)
router.route('/quizSelection').get(quizSelection)
router.route('/settings').get([hasPaid],setting)
router.route('/spinWheel').get([hasPaid],spinWheel)
router.route('/dashboard').get(dashboard)
router.route('/spin').get(spin)
router.route('/admin/create-quiz').get(createQuiz)
router.route('/coursepage').get(coursePage)
router.route('/leaderboard').get(leaderBoard)
router.route('/quiz-page').get(quizPage)
router.route('/quiz-selection').get(quizSelection)
router.route('/settings').get(setting)
router.route('/spinWheel').get(spinWheel)
router.route('/sign-up').post(CreateAccount)
router.route('/sign-in').post(Login)
router.route('/logout').get(Logout)
router.route('/contact').post(contactForm)
router.route('/admin/create-quiz').post(createQuestion)
router.route('/get-quiz').get(getAllQuestion)
router.route('/quiz/:id').get(getQuestion)
router.route('/answered/:id').post(answeredQuestion)
router.route('/verify-account').post(verifyAccount)
router.route('/withdrawal').post(WithdrawFunds)
router.route('/initialize').post(initializeAndRedirect)
router.route('/fund-wallet').post(fundWallet)
router.route('/withdraw').get(withdraw)
router.route('/spin-wheel').post(spintheWheel)
router.route('/test').get(test)
router.route('/create-course').post(createCourse)
router.route('/get-course').get(getAllCourse)
router.route('/user/:id').post(updateProfile)
router.route("/get-all-banks").get(fetchBanks)

module.exports = router;