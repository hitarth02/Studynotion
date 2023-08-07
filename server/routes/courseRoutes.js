const express = require("express")
const router = express.Router()

//import controllers
//get course controllers
const{
    createCourse,
    getCourseDetails, 
    showAllCourses,
    updateCourse,
    updateCourseStatus,
    getInstructorCourses,
    deleteCourse,
    getCourseDetailsUnauthorised
} = require("../controller/course");

//get section controllers
const {
    createSection, 
    updateSection, 
    deleteSection
} = require("../controller/section");

//get subsection controllers
const {
    createSubSection, 
    updateSubSection,
    deleteSubSection
} = require("../controller/subSection");

//get category controllers
const {
    createCategory, 
    categoryPageDetails, 
    getAllCategory
}= require("../controller/category");

//get rating controllers
const {
    createReviewAndRating, 
    getAllRatingAndReview, 
    getAverageRating
} = require("../controller/ratingAndReview");

//get course progress controller
const {
    updateCourseProgress,
    getProgressPercentage
} = require("../controller/courseProgress")

//importing middlewares
const{auth , isAdmin , isInstructor , isStudent} = require("../middleware/roleAuth");

//**********************************************************//
//                      Course Routes                      //
//********************************************************//


router.post("/createCourse",auth,isInstructor,createCourse);
router.put("/updateCourse",auth,isInstructor,updateCourse);
router.put("/editCourse",auth,isInstructor,updateCourseStatus);
router.delete("/deleteCourse",auth,isInstructor,deleteCourse)
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);
router.post("/addSection",auth,isInstructor,createSection);
router.put("/updateSection",auth,isInstructor,updateSection);
router.delete("/deleteSection",auth,isInstructor,deleteSection);
router.post("/addSubSection",auth,isInstructor,createSubSection);
router.put("/updateSubSection",auth,isInstructor,updateSubSection);
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection);
router.get("/getAllCourses",showAllCourses);
router.post("/getCourseDetails",auth,isStudent,getCourseDetails);
router.post("/getCourseDetails",auth,isStudent,getCourseDetails);
router.post("/getCourseDetailsUnauthorised",getCourseDetailsUnauthorised);
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress);
router.get("/getProgressPercentage",auth,isStudent,getProgressPercentage);

//**********************************************************//
//              Category Routes(only by admin)             //
//********************************************************//

router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/getAllCategories",getAllCategory);
router.post("/categoryPageDetails",categoryPageDetails);

//**********************************************************//
//                    rating and review                    //
//********************************************************//

router.post("/createRating",auth,isStudent,createReviewAndRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRatingAndReview",getAllRatingAndReview);

module.exports = router;