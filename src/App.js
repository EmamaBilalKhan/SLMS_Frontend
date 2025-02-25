import './App.css';
import React, {useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import useSLMSStore from './Store/SLMSStore'
import StudentHomePage from './Pages/Student/StudentHomePage';
import AdminHomePage from './Pages/Admin/AdminHomePage';
import TeacherHomePage from './Pages/Teacher/TeacherHomePage';
import CreateCourse from "./Pages/Teacher/CreateCourse"
import CreateAssignment from "./Pages/Teacher/CreateAssignment"
import GradeSubmission from "./Pages/Teacher/GradeSubmission"
import CoursesList from "./Pages/Student/CoursesList"
import AssignmentSubmission from "./Pages/Student/AssignmentSubmission"
import EnrollPage from './Pages/Student/EnrollPage'
import ProgressPage from './Pages/Student/ProgressPage'
import UsersList from './Pages/Admin/UsersList';
import Auth from "./utils/Auth";
import LoadingPage from './Pages/LoadingPage';

function App() {

  const userRole = useSLMSStore((state) => state.userRole);
  const accessToken = useSLMSStore((state) => state.accessToken);
  const [isLoading, setIsLoading] = useState(true)
  const {getAccessToken} = Auth()

  useEffect(()=>{
    const fetchAccessToken = async() => {
      await getAccessToken()
      setTimeout(()=>{
        setIsLoading(false)
      },2000)
    }
    fetchAccessToken()
  },[])
  
  return (
    <Router>
      {
        isLoading &&
        <Routes>
          <Route path="/" element={<LoadingPage/>}/>
        </Routes>

      }
    {!accessToken && !isLoading &&
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    }
    
    {accessToken && !isLoading  && userRole && userRole ==="Student" &&
      <Routes>
        <Route path="/" element={<StudentHomePage/>}>
          <Route path="/enroll-page" element={<EnrollPage/>}/>
          <Route path="/courses-list" element={<CoursesList/>}/>
          <Route path="/assignment-submission" element={<AssignmentSubmission/>}/>
          <Route path="/progress-page" element={<ProgressPage/>}/>
        </Route>
      </Routes>
    }
    {
      accessToken && !isLoading  &&  userRole && userRole ==="Admin" &&
      <Routes>
        <Route path="/" element={<AdminHomePage/>}>
          <Route path="/users-list" element={<UsersList/>}/>
        </Route>
      </Routes>
    }
    {
      accessToken && !isLoading   && userRole && userRole ==="Teacher" &&
      <Routes>
        <Route path="/" element={<TeacherHomePage/>}>
          <Route path="/create-course" element={<CreateCourse/>}/>
          <Route path="/create-assignment" element={<CreateAssignment/>}/>
          <Route path="/grade-submission" element={<GradeSubmission/>}/>
        </Route>
      </Routes>
    }
    </Router>
  );
}

export default App;
