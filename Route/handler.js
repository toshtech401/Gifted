const express = require('express');
const { Login, Logout, CreateAccount, test } = require('../Controller/auth');
const { contactForm } = require('../Controller/Contact');
const { createQuestion, getAllQuestion, getQuestion, answeredQuestion, } = require('../Controller/QuizController');
const { verifyAccount, WithdrawFunds } = require('../Controller/WithdrawController');
const { initializeAndRedirect, fundWallet } = require('../Controller/WalletController');
const { createCourse, getAllCourse } = require('../Controller/createCourse');
const { updateProfile } = require('../Controller/updateProfile');
const { userDashboard} = require('../Controller/userDashboard');
const { home, signUp, signIn, dashboard, coursePage, leaderBoard, quizPage, quizSelection, settings, spinWheel } = require('../Controller/Controller');





const router = express.Router()


router.route('/').get(home)
router.route('/sign-up').get(signUp)
router.route('/sign-in').get(signIn)
router.route('/dashboard').get(dashboard)
router.route('/coursepage').get(coursePage)
router.route('/leaderboard').get(leaderBoard)
router.route('/quizPage').get(quizPage)
router.route('/quizSelection').get(quizSelection)
router.route('/settings').get(settings)
router.route('/spinWheel').get(spinWheel)
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
router.route('/create-course').post(createCourse)
router.route('/get-course').get(getAllCourse)
router.route('/update-profile').patch(updateProfile)
router.route('/userDashboard').get(userDashboard)

module.exports = router;