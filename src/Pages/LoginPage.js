import "./Styles/Login.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import useSLMSStore from '../Store/SLMSStore';
import { ClipLoader } from "react-spinners";
import Auth from "../utils/Auth";

export default function LoginPage(){
    const setUserRole = useSLMSStore((state) => state.setUserRole);
    const setAccessToken = useSLMSStore((state) => state.setAccessToken);
    const setId = useSLMSStore((state) => state.setId);
    const setIsEmailVerified = useSLMSStore((state) => state.setIsEmailVerified);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {encryptToken} = Auth()

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
        try {
            setIsLoading(true);
            const response = await axios.post("http://127.0.0.1:8000/auth/login", 
                {
                    "email": email,
                    "password": password
                },
                { 
                    headers: { "Content-Type": "application/json" }
                }
            );
    
            if (response.status === 200) {
                encryptToken(response.data.refresh_token)
                setUserRole(response.data.user_role)
                setIsEmailVerified(response.data.is_verified)
                setAccessToken(response.data.access_token)
                setId(response.data.userID)
                console.log("Login successful, response: ", response.data);
            } else {
                console.log("Login failed, error:", response.data);
                if(response.status === 400){
                    alert("Incorrect Credentials")
                }
                else{
                    alert("Login failed");
                }
            }
        } catch (e) {
            console.log("Error logging in:", e);
            alert("Error Logging in");
        }
        finally{
            setIsLoading(false);
        }
    };
    

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
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
                {
                    isLoading?  
                    <div className="loading">
                    <ClipLoader color="white" size={30} />
                    </div>:
                
                <button type="submit">Login</button>}
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    )
}