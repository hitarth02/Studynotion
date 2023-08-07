import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassSuccess from "./pages/ResetPassSuccess";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Error from "./pages/Error";
import Profile from "./components/core/Dashboard/Profile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Settings from "./components/core/Dashboard/Settings/Settings";
import StudentDashboard from "./components/core/Dashboard/Student/StudentDashboard";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/Instructor/MyCourses";
import EditCourse from "./components/core/Dashboard/AddCourse/EditCourse/EditCourse";
import ExploreAllCourses from "./pages/ExploreAllCourses";
import Catalog from "./pages/Catalog";
import CourseData from "./pages/CourseData";
import ViewLecture from "./pages/ViewLecture";
import VideoLectureDetails from "./components/core/Dashboard/Student/ViewLecture/VideoLectureDetails";
import InstructorDashboard from "./components/core/Dashboard/Instructor/InstructorDashboard";
import RatingAndReviews from "./pages/RatingAndReviews";
import BrowseCourses from "./pages/BrowseCourses";

function App() {

  const {user} = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter max-w-full">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route 
          path="/about" 
          element={
            <AboutUs/>
          }
        />
        <Route 
          path="/contact" 
          element={
            <ContactUs/>
          }
        />

        <Route 
          path="/login" 
          element={
          <OpenRoute>
            <Login/>
          </OpenRoute>}
        />

        <Route 
          path="/signup" 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />

        <Route 
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />

        <Route 
          path="/reset-password/:id" 
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />

        <Route 
          path="/reset-password-successful" 
          element={
            <OpenRoute>
              <ResetPassSuccess/>
            </OpenRoute>
          }/>

        <Route 
          path="/verify-email" 
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }/>

          <Route 
            path="/allCourses" 
            element={
              <ExploreAllCourses/>
          }/>

          <Route 
            path="/catalog/:name" 
            element={
              <Catalog/>
            }/> 


          <Route 
            path="/course/:courseId" 
            element={
              <CourseData/>
            }
          /> 

          <Route 
            path="/search" 
            element={
              <BrowseCourses/>
            }
          /> 

          <Route 
            path="/catalog/:courseId/reviews" 
            element={
              <RatingAndReviews/>
            }
          /> 

        <Route 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          
          <Route path="/dashboard/profile" element={<Profile/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/Student" element={<StudentDashboard/>}/>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="/dashboard/purchase-history" element={<Error/>}/>
                <Route path="/dashboard/cart" element={<Cart/>}/>
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                <Route path="/dashboard/instructor" element={<InstructorDashboard/>}/>
              </>
            )
          }
          
        </Route>

        <Route 
          element={
            <PrivateRoute>
              <ViewLecture/>
            </PrivateRoute>
          }
        >

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/view-lecture/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoLectureDetails/>}/>
              </>
            )
          }
          
        </Route>

        <Route path="*" element={<Error/>}/>

      </Routes>
      
    </div>
  );
}

export default App;