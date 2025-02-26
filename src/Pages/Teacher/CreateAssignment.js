import "./Styles/CreateAssignment.css"
import { useEffect, useState} from "react";
import useSLMSStore from "../../Store/SLMSStore";
import axios from "axios";
export default function CreateAssignment(){
    
    const accessToken = useSLMSStore((state)=> state.accessToken)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [courses, setCourses] = useState([])
    const [courseOptions,setCourseOptions] = useState([])
    const [selectedCourse, setSelectedCourse] = useState("")

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

    useEffect(()=>{
        const options = courses.map((course)=>({
            value:course._id,
            label:course.course_name
        }))
        setCourseOptions(options)
        console.log("options: ",options)
    },[courses])


    const handleSubmission=async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post("http://127.0.0.1:8000/assignments/create-assignment",{
                "title":title,
                "description": description,
                "course_id": selectedCourse,
                "due_date":dueDate
            },{
                headers:{
                    "Authorization":`Bearer ${accessToken}`
                }
            })

            if(response.status === 201){
                alert("ASsignment Created Successfully")
                console.log(response.data)
                setTitle("")
                setDescription("")
                setDueDate("")
                setSelectedCourse(""); 
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
            <form className="assignment-input-container" onSubmit={handleSubmission}>
                <h2>Create Assignment</h2>
                <input className="assignment-input" type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required maxLength={20} minLength={5}/>
                <input className="assignment-input" type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} required maxLength={30} minLength={8}/>
                <input className="assignment-input" type="text" placeholder="Due Date in the format DD/MM/YYYY" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} required/>
                {/*<input className="assignment-input" type="text" placeholder="Course ID" onChange={(e)=>setCourseID(e.target.value)}/>*/}
                <select
                    className="assignment-input"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Select a course
                    </option>
                    {courseOptions.length > 0 ? (
                        courseOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No courses available</option>
                    )}
                </select>
                <button className="assignment-input-button" type="submit">Create Assignment</button>
            </form>
        </div>
    )
}