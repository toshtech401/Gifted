const express = require('express');
const { SignUp, Login, Logout, CreateAccount } = require('../Controller/auth');
const { createPlan, listPlan } = require('../Controller/PlanController');
const { contactForm } = require('../Controller/Contact');



const router = express.Router()


router.route('/register').post(CreateAccount)
router.route('/login').post(Login)
router.route('/logout').get(Logout)
router.route('/plan/create').post(createPlan)
router.route('/plan/list').get(listPlan)
router.route('/contact').post(contactForm)

module.exports = router;