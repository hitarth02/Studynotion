const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const User = require("../models/User");
const Profile = require("../models/Profile");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomOtp = require("random-otp-generator");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

//Generate OTP controller
exports.sendOtp = async (req,res) => {
    
    try {
        //check if user exists
        const {email} = req.body;
        const userExists = await User.findOne({email: email});
        if(userExists){
            return res.status(401).json(
                {
                    success:false,
                    message:"User already exists",
                }
            );
        };

        // var otp = otpGenerator.generate(6 , {
        //     digits:true,
        //     lowerCaseAlphabets:false,
        //     upperCaseAlphabets:false,
        //     specialChars:false,
        // });
        // let otp = randomOtp(6);
        function generateOTP() {
          let digits = "0123456789";

          let otpLength = 6;

          let oneTimePass = "";

          for (let i = 1; i <= otpLength; i++) {
            let index = Math.floor(Math.random() * digits.length);

            oneTimePass = oneTimePass + digits[index];
          }

          return oneTimePass;
        }

        let otp = generateOTP();

        // check unique otp or not
        let otpExists = await OTP.findOne({otp: otp});
        while(otpExists){
            otp = otpGenerator.generate(6 , {
                digits:true,
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false,
            });
            otpExists = await OTP.findOne({otp: otp});
        };

        //save otp to DB
        const otpData = await OTP.create({email,otp});
        console.log(otpData);

        return res.status(200).json(
            {
                success:true,
                message:"OTP sent successfully!",
                data:otp
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Cannot send OTP!",
            }
        );
    };
};

//sign in controller

exports.signup = async (req,res) => {
    try {
        //*data fetch from req body
        const {firstName , lastName , email , password , accountType , confirmPassword , contactNumber , otp} = req.body;
        //todo: check for contact number input while sigining up with country code!! 
        //*validation
        if(!firstName || !lastName || !email || !password || !confirmPassword ){
            return res.status(403).json(
                {
                    success:false,
                    message:"Please fill all the details carefully!",
                }
            );
        };

        //*check pass and confirm pass
        if(password !== confirmPassword){
            return res.status(400).json(
                {
                    success:false,
                    message:"Password and Confirm password do not match!",
                }
            );
        };

        //*check user exists or not
        const checkUser = await User.findOne({email:email});
        if(checkUser){
            return res.status(400).json(
                {
                    success:false,
                    message:"User already exists!",
                }
            );
        }
        //*find most recent otp of the user
        const recentOtp = await OTP.find({email:email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp is :" ,  recentOtp);

        //*validate OTP
        if(recentOtp.length == 0){
            return res.status(400).json(
                {
                    success:false,
                    message:"OTP NOT FOUND",
                }
            );
        }else if(otp !== recentOtp[0].otp){
                return res.status(400).json(
                    {
                        success:false,
                        message:"OTP NOT MATCH",
                    }
                );
        };

        //hash password
        const hashedPassword = await bcryptjs.hash(password , 10);

        //create entry in Db
        const profileDetails = await Profile.create(
            {
                gender:null,
                about:null,
                dateOfBirth:null,
            }
        );
        const user = await User.create(
            {
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:hashedPassword,
                contactNumber:contactNumber,
                accountType:accountType,
                additionalDetails:profileDetails._id,
                image:`https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`
            }
        );
        //return response
        return res.status(200).json(
            {
                success:true,
                message:"Account created successfully!",
                data:user,
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't Signup due to server error!",
                error:error.message,
            }
        );
    };
};

//login controller
exports.login = async (req,res) => {
    try {
        //fetch data from req body
        const {email , password} = req.body;
        //validation
        if(!email || !password){
            return res.status(403).json(
                {
                    success:false,
                    message:"Please fill all the details carefully!",
                }
            )
        };
        //check if user exists
        let existingUser = await User.findOne({email:email}).populate("additionalDetails").exec();
        if(!existingUser){
            return res.status(401).json(
                {
                    success:false,
                    message:"No account found with this email id. Please Sign up first!"
                }
            );
        };

        //compare passwords and generate token
        
        if( await bcryptjs.compare(password,existingUser.password) ){
            
            const payload = {
                id:existingUser._id,
                email:existingUser.email,
                accountType:existingUser.accountType,
            };
            const token = jwt.sign(payload,process.env.JWT_SECRET,{ 
                expiresIn:"24h",
            });

            existingUser = existingUser.toObject();
            existingUser.token = token;
            existingUser.password = undefined;

            res.cookie("Token",token,{
                expires: new Date(Date.now() + 5*24*60*60*1000),
                httpOnly:true,
            }).status(200).json(
                {
                    success:true,
                    message:"Login successful!",
                    token,
                    existingUser
                }
            );
        }else{
            return res.status(401).json(
                {
                    success:false,
                    message:"Invalid password.",
                }
            )
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't login due to server error!",
                error:error.message,
            }
        );
    };
};

//change password
exports.changePassword = async (req,res) => {
    try {
        const {id} = req.user;
        const {currentPassword , newPassword , confirmNewPassword} = req.body;
        const user = await User.findById({_id:id});

        //*check if all the details are filled
        if(!currentPassword || !newPassword || !confirmNewPassword ){
            return res.status(403).json(
                {
                    success:false,
                    message:"please fill all the details carefully!",
                }
            );
        };
        //*compare current password that user entered is correct or not
        if( await bcryptjs.compare(currentPassword , user.password) ){
            
            //*check if newPassword and confirmNewPassword matches or not
            if(newPassword === confirmNewPassword){
                //hash the newPassword
                const newHashedPassword = await bcryptjs.hash(newPassword , 10);
                //*update the password in database
                await User.findByIdAndUpdate({_id:id}, {password:newHashedPassword}, {new:true});
                //sending mail after successful password change
                const mailTitle = "StudyNotion - Password change";
                const mailBody = "You have successfully changed the password of your studynotion account!"
                try {
                    const sentMail = await mailSender(user.email , mailTitle , mailBody);
                    console.log("Mail sent successfully" , sentMail);
                } catch (error) {
                    console.log(error);
                    console.log("Error while sending mail...");
                };
                const updatedUser = await User.findById(id).populate("additionalDetails").exec();

                return res.status(200).json(
                    {
                        success:true,
                        message:"Password changed successfully!",
                        data:updatedUser,
                    }
                );
            }else{
                return res.status(400).json(
                    {
                        success:false,
                        message:"New password and confirm new password not match!",
                    }
                );
            };

        }else{
            return res.status(401).json(
                {
                    success:false,
                    message:"Invalid current password.",
                }
            )
        };

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't login due to server error!",
                error:error.message,
            }
        );
    }
};