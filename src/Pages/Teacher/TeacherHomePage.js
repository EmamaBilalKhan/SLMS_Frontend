import './Styles/TeacherHomePage.css'
import { IoSchoolSharp } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import { FaPenSquare } from "react-icons/fa";
import useSLMSStore from "../../Store/SLMSStore";
import { BiLogOutCircle } from 'react-icons/bi'
import { Link, useOutlet} from 'react-router-dom'

export default function TeacherHomePage(){

    const setId = useSLMSStore((state)=>state.setId)
    const setUserRole = useSLMSStore((state)=>state.setUserRole)
    const clearAccessToken = useSLMSStore((state)=>state.clearAccessToken)

    const handleLogout = async (e) => {
        e.preventDefault();
        clearAccessToken();
        setId(null)
        setUserRole(null)
        localStorage.removeItem("refresh_token")
    };

  const outlet = useOutlet();
  
    return(
        <div className="HomeScreen">
        <section className="Menu">
          <section className="Logo-Section">
            <IoSchoolSharp color="white" size={"45px"}/>
            <h1>SLMS</h1>
          </section>
          <section className="Menu-Items">
            <ul>
              <li>
                <FaBookOpen color="white" size={"20px"}/>               
                <Link className='Routing-Link' to="/create-course">Create Course</Link>
              </li>
              <li>
                <MdOutlineUploadFile color="white" size={"20px"}/>
                <Link className='Routing-Link' to="/create-assignment">Create Assignment</Link>
              </li>
              <li>
                <FaPenSquare color="white" size={"20px"}/>
                <Link className='Routing-Link' to="/grade-submission">Grade Submissions</Link>
              </li>
            </ul>
          </section>
          <section className="logout">
                <BiLogOutCircle color="white" size={"20px"}/>
                <button onClick={(e)=>handleLogout(e)} className="logout-button">Logout</button>
            </section>
        </section>
        <div className="Content">
                {outlet || (
                    <div className="welcome-message">
                        <h2>Welcome to the Teacher Dashboard</h2>
                        <p>Select an option from the menu to get started.</p>
                    </div>
                )}
            </div>
      </div>
    )
}