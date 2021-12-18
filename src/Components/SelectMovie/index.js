import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"

import "../reset.css"

import Loading from "../Loading"

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
            <SelectMovieH1>Selecione o filme</SelectMovieH1>
            <Movies>
                {movies.map(({posterURL,title,id})=>{
                    return(
                        <Movie onClick={()=> setIdMovie(id)}>
                            <Link to={`/sessions/${id}`}>
                                <img src={posterURL} alt={title} />
                            </Link>
                        </Movie>
                    )
                })}
            </Movies>
        </>
    )
}

const SelectMovieH1 = styled.h1`
    width: 100%;
    min-height: 102px;
    margin-bottom: 11px;

    position: sticky;
    top: 67px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;

    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;

    color: #293845;
`
const Movies = styled.div`
    width: 375px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 28px;
    justify-content: space-between;
    gap: 11px;

`
const Movie = styled.div`
    width: 145px;
    height: 209px;
    left: 30px;
    top: 169px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    img{
        width: 129px;
    }
`