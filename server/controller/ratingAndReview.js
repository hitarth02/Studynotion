const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//create rating and review
exports.createReviewAndRating = async (req , res) => {
    try {
        const userId = req.user.id;
        const {rating , review , courseId} = req.body;

        const courseDetails = await Course.findOne({_id:courseId,
                                            studentsEnrolled:{
                                                $elemMatch:{
                                                    $eq:userId,
                                                }
                                            }
                                        });
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"you have not purchased the course!"
            });
        };
        const alreadyreviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });
        if(alreadyreviewed){
            return res.status(200).json({
                success:false,
                message:"you have already reviewed the course!"
            });
        };

        const ratingReview = await RatingAndReview.create({
            rating:rating,
            review:review,
            course:courseId,
            user:userId,
        });

        await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    ratingAndReviews:ratingReview._id
                }
            },
            {new:true});

            return res.status(200).json({
                success:true,
                message:"Rating and review created succesfully!",
                data:ratingReview,
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't create rating and review!",
                error:error.message,
            }
        );
    };
};

//get average rating
exports.getAverageRating = async (req , res) => {
    try {
        const {courseId} = req.body;
        //get avg rating
        const result = await RatingAndReview.aggregate(
            [
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                    $group:{
                        _id:null,
                        avgRating:{
                            $avg:"$rating"
                        }
                    }
                }
            ]
        );

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                message:"Rating and review found!",
                data:result[0].avgRating,
            });
        };

        return res.status(200).json({
            success:true,
            message:"No Rating and review found! rating is 0",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't create rating and review!",
                error:error.message,
            }
        );
    };
};

//get rating and reviews
exports.getAllRatingAndReview = async (req , res) => {
    try {
        const allReviews = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastname email image",
        })
        .populate({
            path:"course",
            select:"courseName"
        })
        .exec();

        return res.status(200).json({
            success:true,
            message:"All reviews fetched!",
            data:allReviews,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't fetch all rating and review!",
                error:error.message,
            }
        );
    };
};