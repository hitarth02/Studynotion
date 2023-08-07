const User = require("../models/User");
const bcrypt = require("bcryptjs");
const mailSender = require("../utils/mailSender");
const {resetPasswordEmail} = require("../mail/templates/resetPasswordEmail");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const crypto = require('crypto');

//reset password token
exports.resetPasswordToken = async (req , res) => {
    try {
        //fetch email
        const {email} = req.body;
        //validation
        if(!email){
            return res.json(
                {
                    success:false,
                    message:"Please enter your email",
                }
            );
        };
        //check if email exists
        const emailExists = await User.findOne({email:email});
        if(!emailExists){
            return res.json(
                {
                    success:false,
                    message:"Account with this email doesn't exists!",
                }
            );
        };
        //create token
        const token = crypto.randomUUID();
        //set token in DB
        const updateUser = await User.findOneAndUpdate({email:email}, 
            {
                resetPasswordToken:token,
                resetPasswordTokenExpires: Date.now() + 5*60*1000
            },
            {new:true});
        //create url
        const url = `http://localhost:3000/reset-password/${token}`;
        //send this url on mail
        mailSender(email , "StudyNotion - Reset password Link", resetPasswordEmail(url , email));
        //return response
        return res.json(
            {
                success:true,
                message:"Reset password link has been sent to your email.",
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Error in generating token!",
            }
        );
    };
};

//reset Password
exports.resetPassword = async (req , res) => {
    try {
        //fetch data
        const {password , confirmPassword , token} = req.body;
        if(!password || !confirmPassword){
            return res.json(
                {
                    success:false,
                    message:"Kindly fill all the details!",
                }
            );
        };
        if(password !== confirmPassword){
            return res.json(
                {
                    success:false,
                    message:"Password and confirm password do not match",
                }
            );
        };

        const userDetails = await User.findOne({resetPasswordToken: token});
        if(!userDetails){
            return res.json(
                {
                    success:false,
                    message:"Token/user not found!",
                }
            );
        };
        //check token expiry
        if(userDetails.resetPasswordTokenExpires < Date.now()){
            return res.json(
                {
                    success:false,
                    message:"Token is expired!",
                }
            );
        };
        //hash password
        const hashPassword = await bcrypt.hash(password , 10);

        //save new pass to db
        await User.findOneAndUpdate(
            {resetPasswordToken: token},
            {password: hashPassword,},
            {new:true}
        );

        //send mail of successfull password change
        await mailSender(userDetails.email , "Password Reset Successfull - StudyNotion", passwordUpdated(userDetails.email,userDetails.firstName));

        return res.status(200).json(
            {
                success:true,
                message:"Password reset successful!",
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Error in generating token!",
            }
        );
    }
};