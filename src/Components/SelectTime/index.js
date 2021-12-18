// import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

import "../reset.css"

import Footer from "../Footer"
import Loading from "../Loading"

export default function SelectTime({idMovie,setIdSession}) {
    const [movie,setMovie] = useState();
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
            <SelectTimeH1>Selecione o horário</SelectTimeH1>
            <SessionTimes>
                {movie===undefined?"":
                    movie.days.map(({weekday,date,showtimes})=>{
                        return(
                            <>
                            <p>{weekday} - {date}</p>
                            <Times>
                                {showtimes.map(({name,id})=>{
                                    return(
                                        <Link to={`/seats/${id}`}>
                                            <ButtonTime onClick={()=>setIdSession(id)} >{name}</ButtonTime>
                                        </Link>
                                    )
                                })}
                            </Times>
                            </>
                            )
                })}
            </SessionTimes>
            <Footer 
            URL={movie === undefined?"":movie.posterURL} 
            title={movie === undefined?"":movie.title} >
            </Footer>
        </>
    )
    
}
const SelectTimeH1 = styled.h1`
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
    z-index: 1;
`
const SessionTimes = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0 25px;

    display: flex;
    flex-direction: column;
    gap: 22px;
    p{
        width: 100%;
        height: 35px;

        font-family: Roboto;
        font-size: 20px;
        line-height: 23px;

        display: flex;
        align-items: center;
        letter-spacing: 0.02em;

        color: #293845;
    }
`
const Times = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    a:-webkit-any-link {
        text-decoration:none;
    }
`
const ButtonTime = styled.button`
    width: 83px;
    height: 43px;


    background: #E8833A;
    border-radius: 3px;
    border: 0;

    width: 82px;
    height: 43px;

    
    font-family: Roboto;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.02em;
    color: #FFFFFF;
`