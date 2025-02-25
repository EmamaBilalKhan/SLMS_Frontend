import "./Styles/EnrollCourses.css"
import axios from "axios"
import { useState, useEffect } from "react"
import useSLMSStore from "../../Store/SLMSStore"

export default function EnrollPage(){
    
    const [courses, setCourses] = useState([])
    const accessToken = useSLMSStore((state) => state.accessToken)

   


    useEffect(() => {
        const fetchCourses = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/courses/get-courses");
    
            if (response.status === 200) {
                setCourses(response.data.courses);            
            } else {
                console.log("Fetching courses, error:", response.data);
                alert("Fetching courses failed");
            }
        } catch (e) {
            console.log("Error fetching courses:", e);
            alert("Error fetching courses");
        }}

        fetchCourses()

    }, [])

    const formatTime=(ISOTime) =>{
        const date = new Date(ISOTime)
        return date.toLocaleString()
    }

    const enrollInCourse = async (event,courseId) => {
        event.preventDefault()
        try{
            if(!accessToken)
            {
                alert("access token missing")
                return
            }
            const response = await axios.post("http://127.0.0.1:8000/courses/register-course", {
                "course_id": courseId,
            }, {
                headers:{"Authorization" : `Bearer ${accessToken}`}
            })
            if(response.status === 201){
                alert("Enrolled in course successfully")
            }
           
            else{
                alert("Course enroll failed")
                console.log("Course enroll failed:", response.data)

            }
        }
        catch(e){
            console.log("Error enrolling course:", e)
            alert("Error enrolling course")
        }
    };

    return(
        <div className="enroll-container">
            <h1>Enroll in Courses</h1>
            {Array.isArray(courses) && courses.length >=1 ? (
                <div className="enroll-all-courses-container">
                {courses.map((course) => (
                    <div className="enroll-course-container" key={course._id}>
                        <h3>{course.course_name}</h3>
                        <p>Description: {course.description}</p>
                        <p>Course ID: {course._id}</p>
                        <p>Teacher: {course.teacher_name}</p>
                        <p>Created at: {formatTime(course.created_at)}</p>
                        <button className="enroll-button" onClick={(e)=>{enrollInCourse(e,course._id)}}>Enroll</button>
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