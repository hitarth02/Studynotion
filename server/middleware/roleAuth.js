const User = require("../models/User");
const jwt  = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req , res , next) => {
    try {
        const token = req.body.token || req.cookies.Token || req.header("Authorization").replace("Bearer ","") ;
        if(!token){
            return res.status(401).json(
                {
                    success:false,
                    message:"Token not found!",
                }
            );
        };
        try {
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;

        } catch (error) {
            console.log(error);
            return res.status(401).json(
                {
                    success:false,
                    message:"couldn't verify token!",
                    error:error.message
                }
            )
        };
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json(
            {
                success:false,
                message:"Authorization failed!",
                error:error.message,
            }
        )
    };
};

exports.isStudent = async (req , res , next) => {
    try {
        if(req.user.accountType !== "Student"){
            return res.status(401).json(
                {
                    success:false,
                    message:"You are not a student!",
                }
            );
        };
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Authorization failed!",
                error:error.message,
            }
        );
    };
};

exports.isInstructor = async (req , res , next) => {
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json(
                {
                    success:false,
                    message:"You are not an Instructor!",
                }
            );
        };
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Authorization failed!",
                error:error.message,
            }
        );
    };
};

exports.isAdmin = async (req , res , next) => {
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json(
                {
                    success:false,
                    message:"You are not an Admin!",
                }
            );
        };
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Authorization failed!",
                error:error.message,
            }
        );
    };
};