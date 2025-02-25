import "./Styles/CreateCourse.css"
import { useState } from "react"
import axios from 'axios'
import useSLMSStore from "../../Store/SLMSStore";

export default function CreateCourse(){
    const accessToken = useSLMSStore((state)=> state.accessToken)

    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("")

    const handleSubmission=async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post("http://127.0.0.1:8000/courses/create-course",{
                "course_name":courseName,
                "description":courseDescription
            },{
                headers:{
                    "Authorization":`Bearer ${accessToken}`
                }
              
            })

            if(response.status === 201){
                alert("Course Created Successfully")
                console.log(response.data)
            }
            else{
                alert("Something went wrong")
                console.log(response.data)  
            }
        }
        catch(e){
            alert("Something went wrong")
            console.log("error creating course : ", e)
        }
    }

    return(
        <div className="create-course-container">
        <div className="create-course-input-container">
             <h2>Create Course</h2>
            <input className="create-course-input" type="text" placeholder="Course Name" onChange={(e)=>setCourseName(e.target.value)}/>
            <input className="create-course-input" type="text" placeholder="Course Description" onChange={(e)=>setCourseDescription(e.target.value)}/>
            <button className="create-course-input-button" onClick={(e)=>handleSubmission(e)}>Create Course</button>
        </div>
        </div>
    )
}