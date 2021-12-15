import { BrowserRouter, Routes, Route } from "react-router-dom"
import "../reset.css"
import "./style.css"

import SelectMovie from "../SelectMovie"
import SelectTime from "../SelectTime"
import SelectSeat from "../SelectSeat"
import Success from "../Success"
import Header from "../Header"

export default function App() {
    return(
        <div className="page">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<SelectMovie/>}/>
                    <Route path="/select-time" element={<SelectTime/>}/>
                    <Route path="/select-seat" element={<SelectSeat/>}/>
                    <Route path="/success" element={<Success/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}