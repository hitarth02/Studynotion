const express = require("express");
const router = express.Router();

const {
    updateProfile,
    updateDisplayPicture,
    deleteAccount,
    getAllUserDetails,
    getEnrolledCourses,
    instructorStats
} = require("../controller/profile");
const {auth} = require("../middleware/roleAuth");

//profile routes
router.delete("/deleteAccount",auth,deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);

router.get("/getUserDetails",auth,getAllUserDetails);
router.get("/getEnrolledCourses",auth ,getEnrolledCourses);
router.get("/instructorStats",auth,instructorStats);

module.exports = router;