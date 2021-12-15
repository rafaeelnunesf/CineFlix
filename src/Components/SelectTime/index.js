import Header from "../Header"
import Footer from "../Footer"
import "../reset.css"
import "./style.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function SelectTime({idMovie}) {
    const [movie,setMovie] = useState()


    function getSessions() {
        const promiseMovie = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idMovie}/showtimes`)
        promiseMovie.then(answer=>{
            setMovie(answer.data)
        })
    }


    useEffect(getSessions,[])
    return(
        <>
            <h1>Selecione o horário</h1>
            <div className="sessions-times">
                {movie===undefined?"":
                    movie.days.map(day=>{
                        return(
                            <>
                            <p>{day.weekday} - {day.date}</p>
                            <div className="times">
                                {day.showtimes.map(showtime=>{
                                    return(
                                        <Link to="/select-seat">
                                            <button className="time">{showtime.name}</button>
                                        </Link>
                                    )
                                })}
                            </div>
                            </>
                            )
                })}
            </div>
            <Footer 
            URL={movie === undefined?"":movie.posterURL} 
            title={movie === undefined?"":movie.title} >
            </Footer>
        </>
    )
    
}
