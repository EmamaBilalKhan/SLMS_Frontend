import './Styles/UsersList.css'
import { useEffect, useState } from "react"
import axios from "axios"
import useSLMSStore from "../../Store/SLMSStore"
export default function UsersList(){

    const [users, setUsers] = useState([])
    const accessToken = useSLMSStore((state) => state.accessToken)

    useEffect(()=>{
        const fetchUsers = async ()=>{
        try{    
            const response = await axios.get("http://127.0.0.1:8000/admin/users",{
                headers:{
                    "Authorization":`Bearer ${accessToken}`
                }
            })
            if(response.status === 200){
                setUsers(response.data)
            }else{
                alert("Error fetching users")
                console.log("Error fetching users")
            }}
        catch(e){
            alert("Error fetching users")
            console.log(e)
       
        }
        }

       
        fetchUsers()
    },[accessToken])

    const formatTime=(ISOTime) =>{
        const date = new Date(ISOTime)
        return date.toLocaleString()
    }

    return(
        <div className="users-container">
            <h1>Users List</h1>
        <div className="users-list">
            {
                Array.isArray(users) && users.length >= 1 ? users.map((user)=>{
                    return(
                        <div className="user" key={user._id}>
                            <h2>{user.username}</h2>
                            <p>{user.email}</p>
                            <p>Role: {user.role}</p>
                            <p>Created at: {formatTime(user.created_at)}</p>
                            <p>Updated at: {formatTime(user.updated_at)}</p>
                        </div>
                    )
                }):
                <p>No Users Available</p>
            }
    </div>
        </div>
    )
}