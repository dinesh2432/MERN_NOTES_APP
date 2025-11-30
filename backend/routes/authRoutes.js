
const express = require('express')
const { register, login, logout, emailLink, resetPass } = require('../controllers/authControllers')
const authrouter = express.Router()


authrouter.post('/register',register)
authrouter.post('/login',login)
authrouter.post('/logout',logout)
authrouter.post('/email-validate',emailLink)
authrouter.post('/reset-password',resetPass)
module.exports=authrouter