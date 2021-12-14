import "../reset.css"
import "./style.css"

export default function Footer({URL,title,weekday,name}){
    let dateInfo = `${weekday} - ${name}`
    if(weekday === undefined || name ===undefined){
        dateInfo = ""
    }
    return(
        <div className="footer">
            <div className="img-footer">
                <img src={URL} alt={title} />
            </div>
            <div className="info">
                <p className="title">{title}</p>
                <p className="date">{dateInfo}</p>
            </div>
        </div>
    )
}