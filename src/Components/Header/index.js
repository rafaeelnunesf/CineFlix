import { useNavigate,useLocation } from "react-router";
import styled from "styled-components";

import "../reset.css"

export default function Header() {
    const goBack = useNavigate();
    const location = useLocation()
    return(
        <Container>
            {location.pathname !== "/" &&
                <GoBack onClick={()=>goBack(-1)}>
                    <ion-icon name="arrow-undo-sharp"></ion-icon>
                </GoBack>}
            CINEFLIX
        </Container>  
    )
} 

const Container = styled.div`
    width: 100%;
    min-height: 67px;

    position: sticky;
    top: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    font-family: Roboto;  
    font-size: 34px;
    line-height: 40px;
    
    background: #C3CFD9;
    color: #E8833A;
`
const GoBack = styled.div`
    position: absolute;
    left: 25px;
    font-size: 40px;
    &:hover{
        cursor: pointer;
    }
`