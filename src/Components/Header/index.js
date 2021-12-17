import { useNavigate,useLocation } from "react-router";
import "../reset.css"
import "./style.css"
export default function Header() {
    const goBack = useNavigate();
    const location = useLocation()
    return(
        <div className="header">
            {location.pathname !== "/" &&
                <div className="go-back" onClick={()=>goBack(-1)}>
                    <ion-icon name="arrow-undo-sharp"></ion-icon>
                </div>}
            CINEFLIX
        </div>  
    )
}