import "./Styles/Register.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

export default function RegisterPage(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userName, setUserName] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Registering with : ", email, password, userRole, userName)
        try{
            const response = await axios.post("http://127.0.0.1:8000/auth/register", {
                "email": email,
                "password": password,
                "role": userRole,
                "username": userName
            }, {
                headers: { "Content-Type": "application/json" }
            })
            if(response.status === 201){
                console.log("user registered successfully")
                alert("User registered successfully")
                window.location.href = "/register";
            }
            else{
                console.log("error registering user: ", response.data)
                alert("Error Registering")
            }
    }
    catch(error){
        console.log("error registering user: ",error)
        alert("Error Registering")
    }
        
    };


    return (
        <div className="register-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="User Role"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
    )
}