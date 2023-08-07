const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");
const Course = require("../models/Course");

//create category
exports.createCategory = async (req , res) => {
    try {
        const {name , description} = req.body;
        if(!name || !description){
            return res.status(403).json(
                {
                    success:false,
                    message:"please fill all the details carefully!",
                }
            );
        };
        const newCategory = await Category.create({name:name , description:description});
        console.log(newCategory);
        return res.status(200).json(
            {
                success:true,
                message:"Category created successfully!"
            }
        );
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

//fetch all details
exports.getAllCategory = async (req , res) => {
    try {
        const allCategory = await Category.find({},{ name:true , description:true });
        return res.status(200).json(
            {
                success:true,
                message:"Fetched all Category",
                data:allCategory,
            }
        );
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

//category page details
exports.categoryPageDetails = async (req , res) => {
    try {
        const {categoryId} = req.body;
        const selectedCategory = await Category.findById(categoryId).sort({course:"descending"})
                                                .populate({
                                                    path:"course",
                                                    populate:{
                                                        path:"instructor",
                                                        path:"ratingAndReviews"
                                                    }
                                                })
                                                .exec();

        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"course with specified category nop found!"
            });
        };

        const course = await Course.find({
            category: {$ne: categoryId}
        }).populate("instructor").populate("ratingAndReviews").exec();
        

        //get top selling courses
        


        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                course,
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't fetch category page details!",
                error:error.message,
            }
        );
    };
};