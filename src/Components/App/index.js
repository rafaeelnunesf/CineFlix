import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import "../reset.css"

import SelectMovie from "../SelectMovie"
import SelectTime from "../SelectTime"
import SelectSeat from "../SelectSeat"
import Success from "../Success"
import Header from "../Header"

export default function App() {
    const [idMovie,setIdMovie] = useState()
    const [idSession, setIdSession] = useState()
    const [userData, setUserData] = useState({ids:[],name:'',cpf:''})
    return(
        <Page>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<SelectMovie setIdMovie={setIdMovie}/>}/>
                    <Route path={`/sessions/${idMovie}`} element={<SelectTime idMovie={idMovie} setIdSession={setIdSession}/>}/>
                    <Route path={`/seats/${idSession}`} element={<SelectSeat idSession={idSession} setUserData={setUserData}/>}/>
                    <Route path="/success" element={<Success userData={userData}/>}/>
                </Routes>
            </BrowserRouter>
        </Page>
    )
}
const Page = styled.div`
    width: 375px;
    height: 877px;
    overflow-y: scroll;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar{
        display: none;
    }
    a:-webkit-any-link {
        color: -webkit-link;
        cursor: pointer;
        text-decoration: none;
    }
`