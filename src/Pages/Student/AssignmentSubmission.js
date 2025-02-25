import "./Styles/SubmitAssignment.css"
import { useState, useEffect } from "react"
import axios from "axios"
import useSLMSStore from "../../Store/SLMSStore"
export default function AssignmentSubmission(){
    
    const [assignments, setAssignments] = useState([])
    const [fileUrl, setFileUrl] = useState("")
    const accessToken = useSLMSStore((state) => state.accessToken)

    useEffect(() => {
        const fetchAssignments = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/assignments/get-assignments");
    
            if (response.status === 200) {
                setAssignments(response.data.assignments);            
            } else {
                console.log("Fetching assignments, error:", response.data);
                alert("Fetching assignments failed");
            }
        } catch (e) {
            console.log("Error fetching assignments:", e);
            alert("Error fetching assignments");
        }}

        fetchAssignments()

    }, [])

    const formatDate = (ISOTime) => {
        const date = new Date(ISOTime);
        return date.toISOString().split("T")[0];  
    };
    
    const submitAssignment = async (event,assignmentId) => {
        event.preventDefault()
        try{
            if(!accessToken)
            {
                alert("access token missing")
                return
            }
            const response = await axios.post("http://127.0.0.1:8000/assignments/submit-assignment", {
                "assignment_id": assignmentId,
                "file_url": fileUrl
            }, {
                headers:{"Authorization" : `Bearer ${accessToken}`}
            })
            if(response.status === 201){
                alert("Assignment submitted successfully")
            }
           
            else{
                alert("Assignment submission failed")
                console.log("Assignment submission failed:", response.data)

            }
        }
        catch(e){
            console.log("Error submitting assignment:", e)
            alert("Error submitting assignment")
        }
    };

    return(
        <div className="submit-assignment-container">
            <h1>Todo Assignments</h1>
            {Array.isArray(assignments) && assignments.length >=1 ? (
                <div className="all-assignments-container">
                {assignments.map((assignment) => (
                    <div className="assignment-container" key={assignment._id}>
                        <h3>{assignment.title}</h3>
                        <p>Description: {assignment.description}</p>
                        <p>Assignment ID: {assignment._id}</p>
                        <p>Due date: {formatDate(assignment.due_date)}</p>
                        <div>

                            <input placeholder="Enter file url for your assignment" 
                                onChange={(e) => setFileUrl(e.target.value)}
                            required/>  

                            <button type="submit" onClick={(e) => submitAssignment(e, assignment._id)}>Submit</button>
                        </div>    
                    </div>
                ))}
                </div>
            ) : (
                <p>No assignments available</p>
                )
            }
        </div>
    )
}