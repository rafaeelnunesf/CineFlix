import Footer from "../Footer"
import { Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import "../reset.css"
import "./style.css"

export default function SelectSeat({idSession}) {
    const [seats,setSeats] = useState()
    const [isSelected,setIsSelected] = useState([])


    function getSeats() {
        const promiseSeats = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSession}/seats`)
        promiseSeats.then(answer=>{
            setSeats(answer.data)
        })
    }
    
    
    function chooseSeat(id,isAvailable){
        if(isSelected.includes(id)){
            let array = [...isSelected]
            array.splice(array.indexOf(id),1)
            setIsSelected(array)
            return
        }
        else if(id!==undefined && isAvailable === true){
            setIsSelected([...isSelected,id])
            return
        }
        alert('Esse assento não está disponível')
    }


    useEffect(getSeats,[idSession])
    return(
        <>
            <h1>Selecione o(s) assento(s)</h1>
 
            <div className="seats">
                {seats === undefined?"" :
                    seats.seats.map(({id,name,isAvailable})=>{
                        return(
                            <div 
                            className={`seat ${(isSelected.includes(id)) && "selected"} ${isAvailable === false ?'unavailable':''}`} 
                            onClick={()=>chooseSeat(id,isAvailable)}>
                                {name}
                            </div>
                        )
                    })}
            </div>
            <div className="type-seats">  
                <div className="type-selected">
                    <div className="seat selected"></div>
                    Selecionado
                </div>
                <div className="type-available">
                    <div className="seat"></div>
                    Disponível
                </div>
                <div className="type-unavailable">
                    <div className="seat unavailable"></div>
                    Indisponível
                </div>    
            </div>
            <div className="data-user">
                <div>
                    <h2>Nome do comprador:</h2>
                    <input placeholder="Digite seu nome..."></input>
                </div>
                <div>
                    <h2>CPF do comprador::</h2>
                    <input placeholder="Digite seu CPF..."></input>
                </div>
            </div>

            <div className="reserve-seat">
                <Link to="/success">
                    <button>Reservar assento(s)</button>
                </Link>
            </div>
            <Footer 
            URL={seats === undefined?"":seats.movie.posterURL} 
            title={seats === undefined?"":seats.movie.title} 
            weekday={seats === undefined?"":seats.day.weekday} 
            name={seats === undefined?"":seats.name}></Footer>
        </>
    )
}