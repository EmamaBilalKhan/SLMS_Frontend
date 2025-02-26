import "./Styles/GradeSubmissions.css"
import axios from "axios"
import { useState, useEffect } from "react"
import useSLMSStore from "../../Store/SLMSStore"

export default function GradeSubmission(){
    const [grade, setGrade] = useState("")
    const [submissions, setSubmissions] = useState([])
    const accessToken = useSLMSStore((state)=> state.accessToken)

    useEffect(()=>{
        const fetchSubmissions = async()=>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/assignments/get-submissions",{
                    headers:{
                        "Authorization":`Bearer ${accessToken}`
                    }
                })
                if(response.status === 200){
                    setSubmissions(response.data.submissions)
                }
                else{
                    alert("Something went wrong")
                    console.log(response.data)
                }
            }
            catch(e){
                alert("Something went wrong")
                console.log("error fetching submissions : ", e)
            }
        }
        fetchSubmissions()
    },[accessToken])

    const handleSubmission=async(e, submission_id)=>{
        e.preventDefault()
        try{
            const response = await axios.put("http://127.0.0.1:8000/assignments/grade-assignment",{
                 "grade": grade,
                "submission_id" : submission_id
            },{
                headers:{
                    "Authorization":`Bearer ${accessToken}`
                }
            })

            if(response.status === 200){
                alert("Assignment Graded Successfully")
                window.location.reload();
                console.log(response.data)
            }
            else{
                alert("Something went wrong")
                console.log("error Grading assignment : ",response.data)  
            }
        }
        catch(e){
            alert("Something went wrong")
            console.log("error Grading assignment : ", e)
        }

    }

    
    const formatTime=(ISOTime) =>{
        const date = new Date(ISOTime)
        return date.toLocaleString()
    }
    
    return(
        <div className="submissions-container">
            <h2>Grade Submissions</h2>
           {(Array.isArray(submissions) && submissions.length >=1) ?
            <div className="submissions-list">
                {submissions.map((submission, index)=>{
                    return(
                        <div className="grade-submission-container" key={index}>
                                <h3>Student : {submission.student_name}</h3>
                                <p>Assignment : {submission.assignment_name}</p>
                                <p> submitted at: {formatTime(submission.submitted_at)}</p>
                                <p>file_url: {submission.file_url}</p>

                                <input className="grade-submission-input" type="text" placeholder="Grade" onChange={(e)=>setGrade(e.target.value)} />
                                <button onClick={(e)=>handleSubmission(e, submission._id)} className="grade-submission-button">Submit Grade</button>
                            </div>                   )
                })}
            </div>:
            <p>No submissions available</p>}
        </div>
   
    )
}