import Footer from "../Footer"
import { Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import "../reset.css"
import "./style.css"

export default function SelectSeat({idSession,setUserData}) {
    const [seats,setSeats] = useState()
    const [isSelected,setIsSelected] = useState([])
    const [nameSeat,setnameSeat] = useState([])
    const [name, setName] = useState()
    const [cpf, setCpf] = useState()


    function getSeats() {
        const promiseSeats = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSession}/seats`)
        promiseSeats.then(answer=>{
            setSeats(answer.data)
        })
    }
    
    function chooseSeat(id,isAvailable,name){
        if(isSelected.includes(id)){
            let arrayIds = [...isSelected]
            let arrayNames = [...nameSeat]
            arrayIds.splice(arrayIds.indexOf(id),1)
            arrayNames.splice(arrayNames.indexOf(id),1)
            setIsSelected(arrayIds)
            setnameSeat(arrayNames)
            return
        }
        else if(id!==undefined && isAvailable === true){
            setIsSelected([...isSelected,id])
            setnameSeat([...nameSeat,name])
            return
        }
        alert('Esse assento não está disponível')
    }

    function sendDataUser() {
        if(name===undefined){
            alert('Por favor, digite seu nome')
            return
        }else if(cpf===undefined){
            alert('Por favor, digite seu CPF')
            return
        }else if(isSelected.length===0){
            alert('Por favor, escolha pelo menos 1 assento')
            return
        }
        const objectPost = {ids:[...isSelected],name,cpf}
        const requestSeats = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`,objectPost)  
        requestSeats.catch((error)=> console.log("Mensagem de erro: " + error.response.data))

        const finalOrder = {
            ids:[...nameSeat],
            name:name,
            cpf:cpf, 
            titleMovie:seats.movie.title, 
            date:seats.day.date, 
            nameSession:seats.name
        }
        setUserData(finalOrder)
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
                            onClick={()=>chooseSeat(id,isAvailable,name)}>
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
                    <input placeholder="Digite seu nome..." onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <h2>CPF do comprador::</h2>
                    <input placeholder="Digite seu CPF..." onChange={(e) => setCpf(e.target.value)}></input>
                </div>
            </div>

            <div className="reserve-seat">
                {(name===undefined||cpf===undefined||isSelected.length===0)
                ?
                <button onClick={()=> sendDataUser()}>Reservar assento(s)</button>  
                :
                <Link to="/success">
                    <button onClick={()=> sendDataUser()}>Reservar assento(s)</button>
                </Link>}
            </div>
            <Footer 
            URL={seats === undefined?"":seats.movie.posterURL} 
            title={seats === undefined?"":seats.movie.title} 
            weekday={seats === undefined?"":seats.day.weekday} 
            name={seats === undefined?"":seats.name}></Footer>
        </>
    )
}