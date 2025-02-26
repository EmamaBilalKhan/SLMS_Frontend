import "./Styles/CoursesList.css"
//import axios from "axios"
import { useState, useEffect } from "react"
export default function CoursesList(){
    
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/courses/get-courses", {
              method: "GET",
              credentials: "include",
            });
    
            if (!response.ok) {
              throw new Error(`Fetching courses failed with status: ${response.status}`);
            }
    
            const data = await response.json();
            setCourses(data.courses);
          } catch (e) {
            console.error("Error fetching courses:", e);
            alert("Error fetching courses");
          }
        };
    
        fetchCourses();
      }, []);

    const formatTime=(ISOTime) =>{
        const date = new Date(ISOTime)
        return date.toLocaleString()
    }
    
    return(
        <div className="course-list-container">
            <h1>Available Courses</h1>
           
            {Array.isArray(courses) && courses.length >=1 ? (
                <div className="all-courses-container">
                {courses.map((course) => (
                    <div className="course-container" key={course._id}>
                        <h3>{course.course_name}</h3>
                        <p>Description: {course.description}</p>
                        <p>Course ID: {course._id}</p>
                        <p>Teacher: {course.teacher_name}</p>
                        <p>Created at: {formatTime(course.created_at)}</p>
                    </div>
                ))}
                </div>
            ) : (
                <p>No courses available</p>
                )
            }
        </div>
    )
}