const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const uploadImageToCloudinary = require("../utils/imageUploader");
const Course = require("../models/Course");
require("dotenv").config();

exports.createSubSection = async (req , res) => {
    try {

        const {subSectionTitle , subSectionDescription , sectionId , courseId } = req.body;
        const video = req.files.video;

        if(!subSectionTitle || !subSectionDescription || !sectionId){
            return res.status(400).json(
                {
                    message: "Please add all the required fields",
                    success:false,
                }
            );
        };

        const video_Url = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);

        const newSubSection = await SubSection.create({
            subSectionTitle,
            subSectionDescription,
            timeDuration:`${video_Url.duration}`,
            videoUrl : video_Url.secure_url,
        });

        await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push: { subSection:newSubSection._id }
            },{new:true})
            .populate("subSection")
            .exec();

        const updatedCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

            return res.status(200).json(
                {
                    success:true,
                    message:"subSection created succesfully!",
                    data:updatedCourse,
                }
            );

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Couldn't create Subsection",
                error:error.message,
            }
        );
    };
};

exports.updateSubSection = async (req , res) => {
    try {
        const {subSectionID , subSectionTitle , subSectionDescription , courseId} = req.body;

        const subSectiondetails = await SubSection.findById(subSectionID);
        if (!subSectiondetails) {
            return res.status(404).json(
                {
                    success:false,
                    message:"Sub section not found",
                }
            );
        };
        
        if(subSectionTitle !== undefined){
            subSectiondetails.subSectionTitle = subSectionTitle;
        };
        if(subSectionDescription !== undefined){
            subSectiondetails.subSectionDescription = subSectionDescription;
        };

        if(req.file && req.file.videoFile !== undefined){
            const video = req.files.video;
            
            const uploadedVideo = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
            subSectiondetails.videoUrl = uploadedVideo.secure_url;
            subSectiondetails.timeDuration = uploadedVideo.duration;
        };

        await subSectiondetails.save();

        const updatedCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();

        return res.json({
            success: true,
            message: "Section updated successfully",
            data:updatedCourse,
          });


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

exports.deleteSubSection = async (req , res) => {
    try {
        
        const {subSectionId , courseId , sectionId} = req.body;

        const deleteSubSection = await SubSection.findByIdAndDelete(subSectionId);
        if(deleteSubSection === null){
            return res.status(404).json(
                {
                    success:false,
                    message:"Couldn't find section",
                }
            );
        }

        await Section.findByIdAndUpdate(sectionId,
            {$pull:{
                subSection:subSectionId
            }});

            const updatedCourse = await Course.findById(courseId).populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                }
            }).exec();

        return res.json(
            {
                success: true,
                message: "SubSection deleted successfully",
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