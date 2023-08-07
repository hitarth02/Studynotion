const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/getAllCategories",
};

export const profile ={
    CHANGE_PROFILE_PICTURE: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE: BASE_URL + "/profile/updateProfile",
    UPDATE_PASSWORD: BASE_URL + "/auth/changepassword",
    DELETE_ACCOUNT: BASE_URL + "/profile/deleteAccount",
    INSTRUCTOR_STATS: BASE_URL + "/profile/instructorStats",
};

export const enrolledCourses = {
    GET_USER_ENROLLED_COURSES: BASE_URL + "/profile/getEnrolledCourses",
};

export const courseEndpoints ={
    COURSE_INFORMATION_API: BASE_URL + "/course/createCourse",
    EDIT_COURSE_INFORMATION_API: BASE_URL + "/course/updateCourse",
    EDIT_COURSE_STATUS_API: BASE_URL + "/course/editCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    CREATE_SUB_SECTION_API: BASE_URL + "/course/addSubSection",
    EDIT_SUB_SECTION_API: BASE_URL + "/course/updateSubSection",
    DELETE_SUB_SECTION_API: BASE_URL + "/course/deleteSubSection",
    GET_INSTRUCTOR_COURSES: BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_ALL_COURSES_API: BASE_URL + "/course/getAllCourses",
    GET_FULL_COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    GET_FULL_COURSE_DETAILS_API_UNAUTHORISED: BASE_URL + "/course/getCourseDetailsUnauthorised",
    GET_FULL_COURSE_DETAILS_API_INSTRUCTOR: BASE_URL + "/course/getCourseDetailsInstructor",
    CREATE_RATING_AND_REVIEW_API: BASE_URL + "/course/createRating",
    GET_ALL_RATING_AND_REVIEWS_API: BASE_URL + "/course/getAllRatingAndReview",
    UPDATE_COURSE_PROGRESS_API: BASE_URL + "/course/updateCourseProgress",
    GET_PROGRESS_PERCENTAGE_PROTECTED_API: BASE_URL + "/course/getProgressPercentage",
};

export const categoryPageDetails = {
    GET_CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/categoryPageDetails",
};

export const studentPaymentEndpoints = {
    COURSE_PAYMENT_API : BASE_URL + "/payment/capturePayment",
    COURSE_PAYMENT_VERIFICATION_API : BASE_URL + "/payment/verifyPayment",
};