const express = require("express");
const router = express.Router();

const {
    login,
    signup,
    sendOtp,
    changePassword
} = require("../controller/authentication");

const {
    resetPasswordToken,
    resetPassword
} = require("../controller/resetPassword");

const {
    auth,
} = require("../middleware/roleAuth");

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendOtp);
router.put("/changepassword", auth, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

router.post("/reset-password-token", resetPasswordToken);
router.put("/reset-password", resetPassword);

module.exports = router;