const {  registerUser, loginUser, renderRegisterUser, renderLoginUser } = require("../controller/auth/authController")

const router=require("express").Router()
router.route("/register").get(renderRegisterUser).post(registerUser)
router.route("/login").get(renderLoginUser).post(loginUser)
module.exports=router