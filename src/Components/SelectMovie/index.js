import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../Loading"
import "../reset.css"
import "./style.css"

export default function SelectMovie({setIdMovie}) {
    const [movies ,setMovies] = useState([])

    function getMovies() {
        const promiseMovies = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies")
        promiseMovies.then(reposta=>(
            setMovies(reposta.data)
            ))
        }
    useEffect(getMovies,[])
    if(movies.length===0){
        return(
            <Loading/>
        )
    }
    return(
        <>
            <h1>Selecione o filme</h1>
            <div className="movies">
                {movies.map(({posterURL,title,id})=>{
                    return(
                        <div className="movie" onClick={()=> setIdMovie(id)}>
                            <Link to={`/sessions/${id}`}>
                                <img src={posterURL} alt={title} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}