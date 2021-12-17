import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import "../reset.css"
import "./style.css"

import Footer from "../Footer"

export default function SelectSeat({idSession,setUserData}) {
    const [seats,setSeats] = useState()
    const [isSelected,setIsSelected] = useState([])
    const [nameSeat,setnameSeat] = useState([])   
    const [buyers,setBuyers] = useState({ids: [...isSelected],compradores: []})

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
            setBuyers({ids: [arrayIds],compradores: []})
            return
        }
        else if(id!==undefined && isAvailable === true){
            setIsSelected([...isSelected,id])
            setnameSeat([...nameSeat,name])
            setBuyers({ids: [...isSelected,id],compradores: []})
            return
        }
        alert('Esse assento não está disponível')
    }

    function sendDataUser() {
        console.log(buyers.compradores)
        if(isSelected.length===0){
            alert('Por favor, escolha pelo menos 1 assento')
            return
        }
        for(let i = 0; i < buyers.compradores.length; i++ ){
            if(buyers.compradores[i].nome === '' ||buyers.compradores[i].cpf === ''){
                alert(`Por favor, preencha todos os campos para o ${i+1}° comprador`)
                return
            }
        }
        const requestSeats = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`,buyers)  
        requestSeats.catch((error)=> console.log("Mensagem de erro: " + error.response.data))

        const finalOrder = {
            buyers:buyers.compradores, 
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
            <TypeSeats/>
            <DataUsers isSelected={isSelected} buyers={buyers}setBuyers={setBuyers}/>

            <div className="reserve-seat">
                {/* {/* (name===undefined||cpf===undefined||isSelected.length===0)
                ?
                <button onClick={()=> sendDataUser()}>Reservar assento(s)</button>  
                :*/
                <Link to="/success">
                    <button onClick={()=> sendDataUser()}>Reservar assento(s)</button>
                </Link>}
                {/* <button onClick={()=> sendDataUser()}>Reservar assento(s)</button>  */}
            </div>
            <Footer
            URL={seats === undefined?"":seats.movie.posterURL} 
            title={seats === undefined?"":seats.movie.title} 
            weekday={seats === undefined?"":seats.day.weekday} 
            name={seats === undefined?"":seats.name}></Footer>
        </>
    )
}
function TypeSeats() {
    return(
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
    )
}
function DataUsers({isSelected, buyers,setBuyers}) {
    let arrayEmpty = []
    const newArray = buyers

    function usersName(name,i){
        arrayEmpty[i].nome = name //nao apagar
        newArray.compradores = arrayEmpty
        setBuyers(newArray)
    }
    function usersCpf(cpf,i){
        arrayEmpty[i].cpf = cpf //nao apagar
        newArray.compradores = arrayEmpty
        setBuyers(newArray)
    }

    if(isSelected.length===0){
        return(
            <h1>Selecione 1 assento</h1>
        )
    }
    
    return(
        <>
        <div className="data-users">
            {isSelected.map((item,i)=>{
                arrayEmpty[i]={ idAssento: item, nome:'' , cpf:''  }
                return(
                <div className="data-user">
                        <div>
                            <h2>{`Nome do ${i+1}° comprador:`}</h2>
                            <input placeholder="Digite seu nome..." onChange={(e) => usersName(e.target.value,i)}></input>
                        </div>
                        <div>
                            <h2>{`CPF do ${i+1}° comprador:`}</h2>
                            <input placeholder="Digite seu CPF..." onChange={(e) => usersCpf(e.target.value,i)}></input>
                        </div>
                    </div>
            )})}
        </div>
        </>
    )
}