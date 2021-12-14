import "./reset.css"
import "./style.css"

import SelectMovie from "../SelectMovie"
import SelectTime from "../SelectTime"
import SelectSeat from "../SelectSeat"

export default function App() {
    return(
        <div className="page">
            <SelectSeat></SelectSeat>
        </div>
    )
}