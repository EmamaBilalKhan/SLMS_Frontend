import './Styles/AdminHomePage.css'
import { useState } from "react"
import { IoSchoolSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import useSLMSStore from "../../Store/SLMSStore"; 
import { ClipLoader } from "react-spinners";
import { Link, useOutlet } from 'react-router-dom';

export default function AdminHomePage(){
    const outlet = useOutlet()    
    const [isLoading, setIsLoading] = useState(false)


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
                <BsPeopleFill color="white" size={"20px"}/>
                <Link className='Routing-Link' to="/users-list">Users</Link>
              </li>
            </ul>
          </section>
           <section className="logout">
                {isLoading? <ClipLoader color="white" size={30} />: <BiLogOutCircle color="white" size={"20px"}/>}
                <button onClick={(e)=>handleLogout(e)} className="logout-button">Logout</button>
            </section>
        </section>
  
        <div className="Content">
                {outlet || (
                    <div className="welcome-message">
                      <h2>Welcome to the Admin Dashboard</h2>
                      <p>Select an option from the menu to get started.</p>
                    </div>
                )}
        </div>
      </div>
    )
}