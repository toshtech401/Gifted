const express = require('express');
const { Login, Logout, CreateAccount, test } = require('../Controller/auth');
const { contactForm } = require('../Controller/Contact');
const { verifyAccount, WithdrawFunds, fetchBanks } = require('../Controller/WithdrawController');
const { initializeAndRedirect, fundWallet } = require('../Controller/WalletController');
const { createCourse, getAllCourse } = require('../Controller/createCourse');
const { updateProfile } = require('../Controller/updateProfile');
const hasPaid = require("../MiddleWare/hasPaid")
const { home, signUp, signIn, dashboard, gethelp, getsupport, congratulation, payment, planpage, referral, spin, coursePage, leaderBoard, quizPage, quizSelection, setting, spinWheel, makePayment, confirmPayment, sidebar, withdraw } = require('../Controller/Controller');
const spintheWheel = require('../Controller/SpinController');
const { getQuiz, submitQuiz, getNewQuiz, adminPostQuiz, createQuiz } = require('../Controller/QuizController');
const isLoggedIn = require('../MiddleWare/isLoggedIn');
const isAdmin = require('../MiddleWare/isAdmin');



const router = express.Router()


router.route('/').get(home)
router.route('/sidebar').get(sidebar)
router.route('/gethelp').get(gethelp)
router.route('/congratulation').get(congratulation)
router.route('/payment').get(payment)
router.route('/planpage').get(planpage)
router.route('/referral').get(referral)
router.route('/getsupport').get([hasPaid],getsupport)
router.route('/sign-up').get(signUp)
router.route('/confirm-payment').post(confirmPayment)
router.route('/sign-in').get(signIn)
router.route('/makePayment').get(makePayment)
router.route('/dashboard').get([hasPaid, isLoggedIn], dashboard)
router.route('/spin').get([hasPaid, isLoggedIn],spin)
router.route('/coursepage').get([hasPaid, isLoggedIn],coursePage)
router.route('/leaderboard').get([hasPaid, isLoggedIn],leaderBoard)
router.route('/quizPage').get([hasPaid, isLoggedIn],getQuiz)
router.route('/quizSelection').get(quizSelection)
router.route('/settings').get([hasPaid, isLoggedIn],setting)
router.route('/spinWheel').get([hasPaid, isLoggedIn],spinWheel)
router.route('/dashboard').get([hasPaid, isLoggedIn],dashboard)
router.route('/spin').get(spin)
router.route('/coursepage').get(coursePage)
router.route('/leaderboard').get(leaderBoard)
router.route('/quiz-selection').get(quizSelection)
router.route('/settings').get([hasPaid, isLoggedIn],setting)
router.route('/spinWheel').get(spinWheel)
router.route('/sign-up').post(CreateAccount)
router.route('/sign-in').post(Login)
router.route('/logout').get(Logout)
router.route('/contact').post(contactForm)
router.route("/quiz/take-quiz").get([isLoggedIn], getQuiz);
router.route("/quiz/submit-quiz").post([isLoggedIn], submitQuiz);
router.route("/quiz/next-question").get([isLoggedIn], getNewQuiz);
router.route("/quiz/admin-post").get([isLoggedIn, isAdmin], adminPostQuiz);
router.route("/quiz/post-question").post([isLoggedIn, isAdmin], createQuiz);
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