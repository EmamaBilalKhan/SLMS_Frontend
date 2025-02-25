import "./Styles/Loading.css"
import { MoonLoader } from "react-spinners";

export default function LoadingPage(){
    return(
        <div className="Loading-container">
            <MoonLoader color="black" size={100}/>
        </div>
    )
}