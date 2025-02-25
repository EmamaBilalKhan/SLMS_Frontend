import "./Styles/CreateAssignment.css"
import { useState} from "react";
import useSLMSStore from "../../Store/SLMSStore";
import axios from "axios";
export default function CreateAssignment(){
    
    const accessToken = useSLMSStore((state)=> state.accessToken)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [courseID, setCourseID] = useState("")

    const handleSubmission=async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post("http://127.0.0.1:8000/assignments/create-assignment",{
                "title":title,
                "description": description,
                "course_id": courseID,
                "due_date":dueDate
            },{
                withCredentials:true,
                headers:{
                    "Authorization":`Bearer ${accessToken}`
                }
            })

            if(response.status === 201){
                alert("ASsignment Created Successfully")
                console.log(response.data)
            }
            else{
                alert("Something went wrong")
                console.log(response.data)  
            }
        }
        catch(e){
            alert("Something went wrong")
            console.log("error creating assignment : ", e)
        }
    }
    
    return(
        <div className="create-assignment-container">
            <div className="assignment-input-container">
                <h2>Create Assignment</h2>
                <input className="assignment-input" type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
                <input className="assignment-input" type="text" placeholder="Description" onChange={(e)=>setDescription(e.target.value)}/>
                <input className="assignment-input" type="text" placeholder="Due Date" onChange={(e)=>setDueDate(e.target.value)}/>
                <input className="assignment-input" type="text" placeholder="Course ID" onChange={(e)=>setCourseID(e.target.value)}/>
                <button className="assignment-input-button" onClick={(e)=>handleSubmission(e)}>Create Assignment</button>
            </div>
        </div>
    )
}