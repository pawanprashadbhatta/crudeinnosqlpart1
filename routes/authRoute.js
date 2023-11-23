const {  registerUser, loginUser, renderRegisterUser, renderLoginUser, logout, renderForgotPassword, checkForgotPassword, renderOtpForm, handleOtp, renderChangePassword, handlePasswordChange, handleChangePassword } = require("../controller/auth/authController")

const router=require("express").Router()
router.route("/register").get(renderRegisterUser).post(registerUser)
router.route("/login").get(renderLoginUser).post(loginUser)
router.route("/logout").get(logout)
router.route("/forgotPassword").get(renderForgotPassword).post(checkForgotPassword)
router.route("/otp").get(renderOtpForm) 
router.route("/otp/:id").post(handleOtp)
router.route("/changePassword").get(renderChangePassword)
router.route("/passwordChange/:userEmail/:otp").post(handlePasswordChange)
module.exports=router