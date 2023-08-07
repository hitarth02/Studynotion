const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const {instance} = require("../config/razorpay");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const CourseProgress = require("../models/CourseProgress");

//initiate the razorpay order...
exports.capturePayment = async (req , res) =>{
    try {
        //fetch data
        const {courses} = req.body;
        const userId = req.user.id;
        //validate
        if(courses.length === 0){
            return res.status(400).json({success:false , message: "Course id id requirede!"});
        };
        //create total amount instance
        let totalAmount = 0;
        // traverse on the courses array and find the course details for each course id provided in the array
        for(const courseId of courses){
            let courseDetails;
            try {
                //find the course details
                courseDetails = await Course.findById(courseId);
                if(!courseDetails){
                    return res.json({success:false , message: "Course details not found!"});
                };
                
                //check if student already enrolled in the course
                const uid = new mongoose.Types.ObjectId(userId);
                if(courseDetails.studentsEnrolled.includes(uid)){
                    return res.json({success:false , message: "You have already enrolled in course!"});
                };

                //calc the total amount
                totalAmount += courseDetails.coursePrice;

            } catch (error) {
                console.log(error);
                return res.json({
                    success:false,
                    message:"Error in total amount!"
                });
            };
        };

        //create options to create order
        const options = {
            amount: totalAmount * 100,
            currency:"INR",
            receipt: Math.random(Date.now()).toString(),
        };

        // create the order by passing the options and get the payment response
        try {
            const paymentResponse = await instance.orders.create(options);
            res.json({
                success:true,
                message:"Order created successfully!",
                data:paymentResponse,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                success:false,
                message:"Cannot create order",
            });
        };

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while initiating the order! (Whole)",
            error:error.message,
        });
    };
};

exports.verifyPayment = async (req , res) => {
    try {
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;

        const courses = req.body?.courses;
        console.log("PRINTING COURSES ARRAY....",courses);
        const userId = req.user.id;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");

        if(expectedSignature === razorpay_signature){
            //enroll the student into the course
            await enrollStudent(courses , userId, res);
            //return res
            return res.status(200).json({
                success:true,
                message:"payment verified"
            });
        }
        return res.json({
            success:false,
            message:"Payment Verification failed"
        });

    } catch (error) {
        console.log(error);
    };
};

const enrollStudent = async(courses , userId , res) => {
    try {
        if(!courses || !userId){
            return res.status(400).json({success:false , message: "Course id and user id req.!"});
        };

        for(const courseId of courses){
            // let num = parseInt(courseId);
            // let cId = new mongoose.Types.ObjectId(num);
            console.log("PRINTING COURSE ID...",courseId)
            const courseDetails = await Course.findByIdAndUpdate(
                courseId,
                {$push:{studentsEnrolled:userId}},
                {new:true}
            );
            if(!courseDetails){
                return res.status(400).json({success:false , message: "course details not found!"});
            };

            const courseProgress = await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos:[]
            });
            console.log("COURSEPROGESSS",courseProgress);
            const studentEnrollment = await User.findByIdAndUpdate(userId,
                {$push:{courses:courseId , courseProgress:courseProgress._id}},
                {new:true}
            );
            if(!studentEnrollment){
                return res.status(400).json({success:false , message: "course details not found!"});
            };
        };
        
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:"Error while verifying the Payment! (Whole)",
            error:error.message,
        });
    };
};

//capture the payment and initiate the order
// exports.capturePayment = async (req , res) => {
//     try {
//         const {courseID} = req.body;
//         const userID = req.user.id;

//         if(!courseID){
//             return res.status(400).json({
//                 success:false,
//                 message:"Course ID is required",
//             });
//         };
//         const courseDetails = await Course.findById(courseID);
//         if(!courseDetails){
//             return res.status(400).json({
//                 success:false,
//                 message:"Course details not found",
//             });
//         };

//         const userDetails = await User.findById(userID);
//         if(!userDetails){
//             return res.status(400).json({
//                 success:false,
//                 message:"User details not found",
//             });
//         };
//         //check if user already purchased this course..
//         //converting userid which is currenty string to object id
//         const uid = new mongoose.Types.ObjectId(userID);
//         if(courseDetails.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"you have already purchased this course!",
//             });
//         };
    
//         //options to create order
//         const amount = courseDetails.coursePrice;
//         const currency = "INR";
//         const options = {
//             amount: amount*100,
//             currency: currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:courseID,
//                 userId:userID,
//             },
//         };

//         try {
//             //create order and initiate payement
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"Order created successfully",
//                 courseName:courseDetails.courseName,
//                 courseDescription:courseDetails.courseDescription,
//                 orderID:paymentResponse.id,
//                 amount:paymentResponse.amount,
//             });

//         } catch (error) {
//             console.log(error)
//             return res.json({
//                 success:false,
//                 message:"Cannot create order",
//             });
//         };

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(
//             {
//                 success:false,
//                 message:"Couldn't capture payment",
//                 error:error.message,
//             }
//         );
//     }
// };

// //verify signature

// exports.verifySignature = async (req , res) => {
//     try {
//         const webHookSecret = "12345678";
//         const signature = req.header["x-razorpay-signature"];

//         const shasum = crypto.createHmac("sha256",webHookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if(digest === signature){
//             console.log("Payment is Authorised");
//             const {courseId , userId} = req.body.payload.payment.entity.notes;

//             const enrolledCourse = await Course.findByIdAndUpdate(
//                 courseId,
//                 {
//                     $push:{studentsEnrolled:userId}
//                 },
//                 {new:true}
//             );
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found",
//                 });
//             };

//             const enrolledStudent = await User.findByIdAndUpdate(
//                 userId,
//                 {
//                     $push:{courses:courseId}
//                 },
//                 {new:true}
//             );
//             if(!enrolledStudent){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Student not found",
//                 });
//             };

//             //send mail
//             const mailResponse = await mailSender(enrolledStudent.email , 
//                 "Congratulations - From StudyNotion" , 
//                 courseEnrollmentEmail(enrolledCourse.courseName,enrolledStudent.firstName));

//             return res.status(200).json(
//                 {
//                     success:true,
//                     message:"signature verified and Course added !"
//                 }
//             );
//         }else{
//             return res.status(400).json(
//                 {
//                     success:false,
//                     message:"error in verifying signature",
//                 }
//             );
//         };

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(
//             {
//                 success:false,
//                 message:"Verify signaturre controller errored!",
//                 error:error.message,
//             }
//         );
//     }
// };