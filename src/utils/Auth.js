import CryptoJS from "crypto-js";
import axios from "axios";
import useSLMSStore from "../Store/SLMSStore";

export default function Auth() {
    const setAccessToken = useSLMSStore((state) => state.setAccessToken);
    const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
    const setUserRole = useSLMSStore((state) => state.setUserRole);
    const setID = useSLMSStore((state) => state.setId);

    const encryptToken = (refresh_token) => {
        const encryptedToken = CryptoJS.AES.encrypt(refresh_token, SECRET_KEY).toString();
        localStorage.setItem("refresh_token", encryptedToken);
        console.log("Encrypted Token:", encryptedToken);
    };

    
    const decryptToken = () => {
        const encryptedToken = localStorage.getItem("refresh_token");
        if (!encryptedToken) return null;

        try {
            const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Decryption error:", error);
            return null;
        }
    };

    const getAccessToken=async()=>{
        const refresh_token=decryptToken()
        console.log("refresh token: ",refresh_token)
        if(!refresh_token){
            setAccessToken(null)
            return
        }
        try{
            const response=await axios.post("http://127.0.0.1:8000/auth/refresh",{
                "refresh_token":refresh_token
            })
            if(response.status === 200){
                setAccessToken(response.data.access_token)
                setUserRole(response.data.user_role)  
                setID(response.data.user_id)
            }
            else{
                setAccessToken(null)
                localStorage.removeItem("refresh_token")
            }
        }
        catch(e){
            console.log("error getting access token: ",e)
        }
    }

    return {getAccessToken, encryptToken, decryptToken };
}
