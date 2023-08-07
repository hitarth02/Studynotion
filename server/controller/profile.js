const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const uploadImageToCloudinary = require("../utils/imageUploader");
const { default: mongoose } = require("mongoose");
const {convertSecondsToDuration} = require("../utils/timeFormatter")
require("dotenv").config();

exports.updateProfile = async (req, res) => {
  try {
    const {
      dateOfBirth = "",
      about = "",
      gender = "",
      firstName,
      lastName,
      contactNo,
      countryCode,
    } = req.body;
    console.log("PRINTING PROFILE DATA", dateOfBirth, about, firstName);
    const { id } = req.user;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, msg: "Please add gender and id !" });
    }

    console.log("PRINTING USER ID", id);
    const userDetails = await User.findById(id);
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    await userDetails.save();

    const profileID = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileID);
    console.log("PRINTING PROFILE ID", profileID);
    if (!profileDetails) {
      return res
        .status(400)
        .json({ success: false, msg: "Profile not found !" });
    }

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNo = contactNo;
    profileDetails.countryCode = countryCode;
    await profileDetails.save();

    const updatedDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      msg: "Profile Updated Successfully !",
      data: updatedDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't update profile",
      error: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const { id } = req.user;
    const enrolledCourses = await User.findOne({ _id: id })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

      let userDetails = await User.findOne({
        _id: id,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: id,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      };

    if (!enrolledCourses) {
      return res.status(200).json({
        success: false,
        message: "Couldnt find any enrolled courses !",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Enrolled courses fetched!",
      data: userDetails.courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't get enrolled courses!",
      error: error.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({ _id: userId })
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res.status(200).json({
        success: false,
        msg: "Couldnt find additional details!",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "User details fetched!",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in fetching user details!",
      error: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const { id } = req.user;
    const displayPicture = req.files.displayPicture;

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      { image: image.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully!",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't update profile",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Please add id !" });
    }

    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(400).json({ success: false, msg: "User not found !" });
    }

    const profileID = userDetails.additionalDetails;
    const enrolledCourses = userDetails.courses;

    //unEnroll user
    await Course.findByIdAndUpdate(enrolledCourses, {
      $pull: {
        studentsEnrolled: userDetails._id,
      },
    });

    await Profile.findByIdAndDelete(profileID);
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      msg: "Profile Deleted Successfully !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't delete profile",
      error: error.message,
    });
  }
};

exports.instructorStats = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.json({
        success: false,
        message: "instructor id not found!",
      });
    }
    const courseDetails = await Course.find({ instructor: userId });
    if (!courseDetails) {
      return res.json({
        success: false,
        message: "course details not found!",
      });
    }
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalIncome = course.coursePrice * totalStudentsEnrolled;

      //*create an object with these stats
      const courseDataStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalIncome,
      };
      return courseDataStats;
    });

    return res.status(200).json({
      success: true,
      data: courseData,
      message: "course stats fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
