import './Styles/StudentHomePage.css'
import { IoSchoolSharp } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa6";
import { MdOutlineUploadFile } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import useSLMSStore from "../../Store/SLMSStore"; 
import { Link, useOutlet} from 'react-router-dom'

export default function StudentHomePage(){
    const outlet = useOutlet()
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
                <Link className='Routing-Link' to="/courses-list">Courses</Link>
              </li>
              <li>
                <MdOutlineUploadFile color="white" size={"20px"}/>
                <Link className='Routing-Link' to="/Assignment-submission">Assignment Submission</Link>
              </li>
              <li>
                <BiBookAdd color="white" size={"20px"}/>
                <Link className='Routing-Link' to="/enroll-page">Enroll Courses</Link>              
              </li>
              <li>
                <BsGraphUp color="white" size={"20px"}/>
                <Link className='Routing-Link' to="/progress-page">Progress Page</Link>
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
                        <h2>Welcome to the Student Dashboard</h2>
                        <p>Select an option from the menu to get started.</p>
                    </div>
                )}
        </div>
      </div>
    )
}