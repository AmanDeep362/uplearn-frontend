import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import a single style file only at index file
import "./styles/main.scss";
// Importing modules
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Loader from "./components/Loader";
import Courses from "./components/Courses/Courses";

// The Admin Portal Links
import AdminLogin from "./components/AdminPortal/AdminLogin";
import AdminHome from "./components/AdminPortal/AdminHome";
import InstructorRegister from "./components/AdminPortal/InstructorRegister";
import Logout from "./components/logout/logout";
import ImageUploader from "./components/IMAGEUPLOADER/ImageUploader";
import StudentList from "./components/AdminPortal/StudentList";
import AssignTaskToInstructor from "./components/AdminPortal/AdminAssignTask";
import AssignSyllbusTask from "./components/AdminPortal/AssignTask";
import AdminReviewLectData from "./components/AdminPortal/AdminReviewLectData";
import ReviewInstructorTaskHome from "./components/AdminPortal/ReviewInstructorTask/ReviewTaskHome";
import Addcareercourses from "./components/AdminPortal/addcareercourses";

// Instructor Dashboard
import InstructorDashboard from "./components/instructorDashboard/InstructorProfile/InstructorDashboard";
// Instructor My Task
import InstructorAddTaskDetails from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/InstructorAddTaskDetails";
import InstructorAddTaskVideo from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/InstructorAddTaskVideo";
import InstructorAddTaskQuiz from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/InstructorAddTaskQuiz";
import InstAddNewTaskQuiz from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/AddNewTaskQuiz";
import AddNewQuizQuestion from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/AddNewQuizQuestion";
// Instructor Edit and Preview task
import InstructorPreviewTaskHome from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/PreviewTask/PreviewMyTaskHome";
import EditMyArticleTask from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyTask/PreviewTask/EditTaskAfterReview/EditArticle";

// Instructor My Courses
import AddCourses from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyCourses/addCourse";
import InstructorEditContent from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyCourses/InstructorEditContent";
import AddQuiz from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyCourses/addQuiz";
import AddQuestion from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyCourses/addQuestion";
import InstPreviewMyCourseHome from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyCourses/PreviewMyCourse/PreviewMyCourseHome";
import EditMyCourseArticle from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyCourses/PreviewMyCourse/EditArticle";
import ChangeInstructorPassword from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/ChangeInstPassword";

//Student Dashboard
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import ChangePassword from "./components/Dashboard/DashboardComponents/ChangePassword";
import UpdateMyStudentProfile from "./components/Dashboard/DashboardComponents/UpdateProfile";

//Doubt Section
import Doubt from "./components/Doubt/Doubt";
import Postdoubt from "./components/Doubt/Postdoubt";
import MainDoubt from "./components/Doubt/MainDoubt";

//redux setup
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Contact from "./components/Contact/Contact";
import AboutUs from "./components/About/AboutUs";
import AddBook from "./components/AdminPortal/AddBook";

import InstructorList from "./components/AdminPortal/InstructorList";
import LibraryPage from "./components/Library/LibraryHome";

// Home Route
import Home from "./components/Home/Home";
import ContactDetails from "./components/AdminPortal/ContactDetails";

//Games
import Games from "./components/Games/Games";
import Main from "./games/game1/Main";
import Hangman from "./games/game2/Hangman";
import Game3 from "./games/game3/Game3";
import Game4 from "./games/game4/Game4";

import CourseInfo from "./components/Courses/CourseInfo";
import CourseContent from "./components/Courses/courseContent";
import SubCourses from "./components/Courses/SubCourses";

// career counselling
import After12th from "./components/Career Counselling/After12th";
import After10th from "./components/Career Counselling/After10th";
import Exams from "./components/Career Counselling/Exams";
import AboutCourse from "./components/Career Counselling/AboutCourse";
import ScholarshipCounselling from "./components/Career Counselling/Scholarship";

//Notes
import AddNotes from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyClasses/AddNotes";
import Classnotes from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyClasses/Classnotes";
import AddNotice from "./components/instructorDashboard/InstructorProfile/InstrutorComponent/MyClasses/AddNotice";

// My Lecture
import BoardSelect from "./components/MyLectures/LectureRoutes/BoardSelect";
import ClassSelect from "./components/MyLectures/LectureRoutes/ClassSelect";
import SubjectSelect from "./components/MyLectures/LectureRoutes/Subject";
import LectureContent from "./components/MyLectures/LectureData/ContentPage";
import MyLectureContent from "./components/MyLectures/LectureData/lectureContent";

function App() {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <Provider store={store}>
        <Router>
          {/* The Navbar component */}
          <Navbar />
          <Routes>
            {/* ////////// Starting Routes ////////// */}
            {/* The Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />

            {/* /////////////////////////////////////////////////// */}
            {/* The Student Dashboard */}
            <Route path="/studentdashboard/*" element={<StudentDashboard />} />
            <Route
              path="/change-student-password"
              element={<ChangePassword />}
            />
            <Route
              path="/update-student-profile"
              element={<UpdateMyStudentProfile />}
            />

            {/* /////////////////////////////////////////////////////////////// */}
            {/* My Lectures  */}
            <Route path="/my-lectures" element={<BoardSelect />} />
            <Route path="/my-lectures/:board" element={<ClassSelect />} />
            <Route
              path="/my-lectures/:board/:class"
              element={<SubjectSelect />}
            />
            <Route
              path="/my-lectures/:board/:class/:subject"
              element={<LectureContent />}
            />

            <Route path="/my-lecture/data/:id" element={<MyLectureContent />} />

            {/* ///////////////////////////////////////////////// */}
            {/* IMAGEUPLOADER */}
            <Route path="/imageuploader" element={<ImageUploader />} />

            {/* ///////////////////////////////////////////////// */}
            {/* The Admin Routes */}
            <Route
              path="/admin-portal-login-190310554227"
              element={<AdminLogin />}
            />
            <Route
              path="/admin-portal-home-190310554227"
              element={<AdminHome />}
            />
            <Route
              path="/admin-portal-instructorRegis-190310554227"
              element={<InstructorRegister />}
            />

            <Route
              path="/admin-portal-Addbook-190310554227"
              element={<AddBook />}
            />
            <Route
              path="/admin-portal-InstructorList-190310554227"
              element={<InstructorList />}
            />
            <Route
              path="/admin-portal-contact-details-190310554227"
              element={<ContactDetails />}
            />
            <Route
              path="/admin-portal-StudentList-190310554227"
              element={<StudentList />}
            />
            <Route
              path="/admin-portal-assign-task-190310554227"
              element={<AssignTaskToInstructor />}
            />
            <Route
              path="/admin-portal-assign-task-190310554227/:id"
              element={<AssignSyllbusTask />}
            />

            <Route
              path="/admin-portal-review-assign-task-190310554227"
              element={<AdminReviewLectData />}
            />

            <Route
              path="/admin-portal-review-assign-task-190310554227/:id"
              element={<ReviewInstructorTaskHome />}
            />

            <Route
              path="/admin-portal-Add-Carrier-190310554227"
              element={<Addcareercourses />}
            />

            {/* //////////////////////////////////////// */}
            {/* Instructor Dashboard */}

            <Route
              path="/instructordashboard/*"
              element={<InstructorDashboard />}
            />
   
            <Route
              path="/task-assign/add-lecture-data/:id/:teacher"
              element={<InstructorAddTaskDetails />}
            />

            <Route
              path="/task-assign/add-lecture-video/:id/:teacher"
              element={<InstructorAddTaskVideo />}
            />

            <Route
              path="/task-assign/add-lecture-quiz/:id/:teacher"
              element={<InstructorAddTaskQuiz />}
            />

            <Route
              path="/task-assign/add-lecture-quiz/add-new-quiz/:id"
              element={<InstAddNewTaskQuiz />}
            />

            <Route
              path="/task-assign/preview-my-data/:id/:teacher"
              element={<InstructorPreviewTaskHome />}
            />
            <Route path="/addnotes" element={<AddNotes />} />
            <Route path="/classnotes" element={<Classnotes />} />
            <Route path="/addnotice" element={<AddNotice />} />

            {/* /// Edit And Preview Lecture Task ///  */}

            <Route
              path="/instructordashboard/my-courses/edit-content/:id"
              element={<InstructorEditContent />}
            />

            <Route
              path="/task-assign/edit-lecture-article/:id/:teacher/:course"
              element={<EditMyArticleTask />}
            />

            <Route
              path="/instructor-change-password"
              element={<ChangeInstructorPassword />}
            />

            {/* //////////////////////  */}

            <Route
              path="/task-assign/add-lecture-quiz/add-new-quiz/add-questions/:id/:quiz_id"
              element={<AddNewQuizQuestion />}
            />

            {/* //////////////////////////////////////////////// */}

            <Route
              path="/instructordashboard/my-courses/add-new-course"
              element={<AddCourses />}
            />

            <Route
              path="/instructordashboard/my-courses/edit-content/add-quiz/:id"
              element={<AddQuiz />}
            />

            <Route
              path="/instructordashboard/my-courses/edit-content/add-quiz/add-questions/:id/:quiz_id"
              element={<AddQuestion />}
            />

            <Route
              path="/instructordashboard/my-courses/preview-content/:id"
              element={<InstPreviewMyCourseHome />}
            />

            <Route
              path="/my-course/edit-course-article/:id/:course"
              element={<EditMyCourseArticle />}
            />

            {/* ////////////////////////////////////////////////  */}
            {/* Doubt Dashboard */}
            <Route path="/ask-doubt" element={<Doubt />} />
            <Route path="/post-doubt" element={<Postdoubt />} />
            <Route path="/ask-doubt/:id" element={<MainDoubt />} />

            {/* /////////////////////////////////////////////////// */}
            {/* Courses of User */}
            <Route path="/courses" element={<Courses />} />

            <Route path="/courses/:value" element={<SubCourses />} />

            <Route path="/course/:id" element={<CourseInfo />} />

            <Route
              path="/mycourses/start-learning/:id"
              element={<CourseContent />}
            />

            {/* //////////////////////////////////////////////////// */}
            {/* The Library */}
            <Route path="/uplearn-virtual-library" element={<LibraryPage />} />

            {/* //////////////////////////////////////////////////// */}
            {/* Game */}
            <Route path="/learn-with-fun" element={<Games />} />
            <Route path="/maths-booster" element={<Main />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/count-and-choose" element={<Game3 />} />
            <Route path="/guess-language" element={<Game4 />} />

            {/* ///////////////////////////////////////////////////////  */}
            {/* Career Counselling Route */}
            <Route
              path="carrer-counselling/12/:after_12"
              element={<After12th />}
            />
            <Route
              path="carrer-counselling/10/:after_10"
              element={<After10th />}
            />
            <Route path="carrer-counselling/exam/:exams" element={<Exams />} />
            <Route
              path="carrer-counselling/scholar/:scholarship"
              element={<ScholarshipCounselling />}
            />
            <Route path="/carrer-counselling/:id" element={<AboutCourse />} />

            {/* ///////////////////////////////////////////////////////  */}
            {/* Home Route  */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/" element={<Home />} exact />
            <Route path="*" element={<PageNotFound />} />

            {/* //////// End Of Routes ////////// */}
          </Routes>
          {/* The Footer component */}
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
