import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../reset.css"
import "./style.css"
import Footer from "../Footer"
import Loading from "../Loading"

export default function SelectTime({idMovie,setIdSession}) {
    const [movie,setMovie] = useState()
    function getSessions() {
        const promiseMovie = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idMovie}/showtimes`)
        promiseMovie.then(answer=>{
            setMovie(answer.data)
        })
    }
    useEffect(getSessions,[idMovie])
    if(movie===undefined){
        return(
            <Loading/>
        )
    }
    return(
        <>
            <h1>Selecione o horário</h1>
            <div className="sessions-times">
                {movie===undefined?"":
                    movie.days.map(({weekday,date,showtimes})=>{
                        return(
                            <>
                            <p>{weekday} - {date}</p>
                            <div className="times">
                                {showtimes.map(({name,id})=>{
                                    return(
                                        <Link to={`/seats/${id}`}>
                                            <button className="time" onClick={()=>setIdSession(id)} >{name}</button>
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
