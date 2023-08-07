const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const uploadImageToCloudinary = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../../src/utils/timeFormatter");
require("dotenv").config();

//create Course controller
exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      coursePrice,
      category,
      tags,
      language,
      instructions,
      status,
    } = req.body;

    //converting stringified arrey to array
    const _tag = JSON.parse(tags);
    const _instructions = JSON.parse(instructions);
    const _whatYouWillLearn = JSON.parse(whatYouWillLearn);

    const courseThumbnail = req.files.courseThumbnail;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !coursePrice ||
      !category
    ) {
      return res
        .status(400)
        .json({ message: "Please add all the required fields" });
    }

    const instructorID = req.user.id;
    const instructorDetails = await User.findById(instructorID);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    }

    const thumbnailUpload = await uploadImageToCloudinary(
      courseThumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      whatYouWillLearn: _whatYouWillLearn,
      coursePrice: coursePrice,
      tags: _tag,
      language: language,
      instructions: _instructions,
      status: status,
      instructor: instructorDetails._id,
      courseThumbnail: thumbnailUpload.secure_url,
      category: categoryDetails._id,
      status: status,
    });

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Course created successfully!",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't create course",
      error: error.message,
    });
  }
};

//update course
exports.updateCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      coursePrice,
      category,
      tags,
      language,
      instructions,
      status,
      courseId,
    } = req.body;
    const courseThumbnail = req.files.courseThumbnail;

    const updateCourse = await Course.findByIdAndUpdate(
      { id: courseId },
      {
        courseName: courseName,
        courseDescription: courseDescription,
        whatYouWillLearn: whatYouWillLearn,
        courseThumbnail: courseThumbnail,
        coursePrice: coursePrice,
        category: category,
        tags: tags,
        language: language,
        instructions: instructions,
        status: status,
      }
    );

    return res.status(200).json({
      success: true,
      message: "course updated successfully",
      data: updateCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't update course",
      error: error.message,
    });
  }
};

exports.updateCourseStatus = async (req, res) => {
  try {
    const { status, courseId } = req.body;
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        status: status,
      },
      { new: true }
    );

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't update course",
      error: error.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    console.log(updates);
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

//get all courses
exports.showAllCourses = async (req, res) => {
  try {
    // here search the course on the basis of the course status..
    // only show published courses 
    const allCourses = await Course.find(
      {
        status:"Published"
      },
      {
        courseName: true,
        courseDescription: true,
        coursePrice: true,
        courseThumbnail: true,
        instructor: true,
        category:true,
        ratingAndReviews:true,
        tags:true
      }
    )
      .populate("instructor")
      .populate("category")
      .populate("ratingAndReviews")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All Courses fetched successfully!",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't fetch all course",
      error: error.message,
    });
  }
};

// get course details
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the courseId",
      });
    };

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate({
        path:"ratingAndReviews",
        populate:{
          path:"user"
        }
      })
      .populate("studentsEnrolled")
      .populate("category")
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course found with the given id",
      });
    }


      const completedVideos = await CourseProgress.findOne({
        courseID:courseId,
        userId:userId
      })


    return res.status(200).json({
      success: true,
      message: "Course details fetched",
      data: courseDetails,
      completedVideosData:completedVideos?.completedVideos ? completedVideos?.completedVideos : [],
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't fetch course details",
      error: error.message,
    });
  }
};

exports.getCourseDetailsUnauthorised = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the courseId",
      });
    };

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate({
        path:"ratingAndReviews",
        populate:{
          path:"user"
        }
      })
      .populate("studentsEnrolled")
      .populate("category")
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course found with the given id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched",
      data: courseDetails,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't fetch course details",
      error: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  };
};
