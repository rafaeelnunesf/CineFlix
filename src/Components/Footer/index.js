import "./reset.css"
import "./style.css"

export default function Footer({URL,title}) {
    return(
        <div className="footer">
            <div className="img-footer">
                <img src={URL} alt={title} />
            </div>
            <div className="info">
                <p className="title">{title}</p>
                <p className="date"></p>
            </div>
        </div>
    )
}