const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req , res) => {

    try {
        const {sectionName , courseID} = req.body;

        if(!sectionName || !courseID) {
            return res.status(400).json(
                {
                    success:false,
                    message:"Fill all the details!"
                }
            );
        };
        const courseDetails = await Course.findById(courseID);
        if(!courseDetails) {
            return res.status(400).json(
                {
                    success:false,
                    message:"Course not found!"
                }
            );
        };
        const newSection = await Section.create({
            sectionName:sectionName,
        });

        const updateCourseDetails = await Course.findByIdAndUpdate(courseID,
            {
                $push:{
                    courseContent:newSection._id
                },
            },
            {new:true}).populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }).exec();

        return res.status(200).json(
            {
                success:true,
                message:"section created succesfully!",
                data:updateCourseDetails,
            }
        );
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't create section",
                error:error.message,
            }
        );
    };
};

exports.updateSection = async (req , res) => {
    try {

        const { sectionId , sectionName , courseId} = req.body;
        if(!sectionId || !sectionName){
            return res.status(400).json(
                {
                    success:false,
                    message:"section not found!",
                }
            );
        };

        const updateSection = await Section.findByIdAndUpdate(sectionId,
                {sectionName:sectionName},
                {new:true});
        
        const updatedCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        return res.status(200).json(
            {
                success:true,
                message:"section updated succesfully!",
                data:updatedCourse,
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't create section",
                error:error.message,
            }
        );
    };
};

exports.deleteSection = async (req , res) => {
    try {
        const {sectionId , courseId} = req.body;
        if(!sectionId){
            return res.status(400).json(
                {
                    success:false,
                    message:"section id not found!",
                }
            );
        };

        await Section.findByIdAndDelete(sectionId,{new:true});

        const updatedCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        return res.status(200).json(
            {
                success:true,
                message:"section deleted succesfully!",
                data:updatedCourse,
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't Delete section",
                error:error.message,
            }
        );
    };
};


