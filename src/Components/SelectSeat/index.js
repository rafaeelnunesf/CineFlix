import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from 'styled-components';
import axios from "axios"

import "../reset.css"

import Footer from "../Footer"
import Loading from "../Loading"

export default function SelectSeat({idSession,setUserData}) {
    const [seats,setSeats] = useState()
    const [isSelected,setIsSelected] = useState([])
    const [nameSeat,setnameSeat] = useState([])   
    const [buyers,setBuyers] = useState({ids: [...nameSeat],compradores: []})

    function getSeats() {
        const promiseSeats = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSession}/seats`)
        promiseSeats.then(answer=>{
            setSeats(answer.data)
        })
    }
    useEffect(getSeats,[idSession])

    function chooseSeat(id,isAvailable,name){
        console.log(id)
        console.log(name)
        if(isSelected.includes(id)){
            let arrayIds = [...isSelected]
            let arrayNames = [...nameSeat]
            arrayIds.splice(arrayIds.indexOf(id),1)
            arrayNames.splice(arrayNames.indexOf(id),1)
            setIsSelected(arrayIds)
            setnameSeat(arrayNames)
            setBuyers({ids: [arrayNames],compradores: []})
            return
        }
        else if(id!==undefined && isAvailable === true){
            setIsSelected([...isSelected,id])
            setnameSeat([...nameSeat,name])
            setBuyers({ids: [...nameSeat,name],compradores: []})
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
        // Descomentar esse bloco pra fazer as requests pra API
        /* const requestSeats = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`,buyers)  
        requestSeats.catch((error)=> console.log("Mensagem de erro: " + error.response.data)) */

        const finalOrder = {
            buyers:buyers.compradores, 
            titleMovie:seats.movie.title, 
            date:seats.day.date, 
            nameSession:seats.name
        }
        setUserData(finalOrder)
    }

    if(seats===undefined){
        return(
            <Loading/>
        )
    }
    return(
        <>
            <SelectSeatH1>Selecione o(s) assento(s)</SelectSeatH1>
            <Seats>
                {seats.seats.map(({id,name,isAvailable})=>{
                        return(
                            <Seat 
                            className={`${(isSelected.includes(id)) && "selected"} ${isAvailable === false &&'unavailable'}`} 
                            onClick={()=>chooseSeat(id,isAvailable,name)}>
                                {name}
                            </Seat>
                        )
                    })}
            </Seats>
            <TypeSeats/>
            <DataUsers nameSeat={nameSeat} buyers={buyers}setBuyers={setBuyers}/>

            <ReserveSeat>
                {/* {/* (name===undefined||cpf===undefined||isSelected.length===0)
                ?
                <button onClick={()=> sendDataUser()}>Reservar assento(s)</button>  
                :*/
                <Link to="/success">
                    <Button onClick={()=> sendDataUser()}>Reservar assento(s)</Button>
                </Link>}
                {/* <button onClick={()=> sendDataUser()}>Reservar assento(s)</button>  */}
            </ReserveSeat> 
            <Footer
            URL={seats.movie.posterURL} 
            title={seats.movie.title} 
            weekday={seats.day.weekday} 
            name={seats.name}></Footer>
        </>
    )
}
function DataUsers({nameSeat, buyers,setBuyers}) {
    let arrayEmpty = []
    const newArray = buyers
    console.log(buyers)
    function usersName(name,i){
        arrayEmpty[i].nome = name 
        newArray.compradores = arrayEmpty
        setBuyers(newArray)
    }
    function usersCpf(cpf,i){
        arrayEmpty[i].cpf = cpf 
        newArray.compradores = arrayEmpty
        setBuyers(newArray)
    }
    
    if(nameSeat.length===0){
        return(
            <SelectSeatH1>Selecione 1 assento</SelectSeatH1>
        )
    }
    
    return(
        <>
        <DataUsersContainer>
            {nameSeat.map((item,i)=>{
                arrayEmpty[i]={ idAssento: item, nome:'' , cpf:''  }
                return(
                <DataUser>
                    <div>
                        <h2>{`Nome do ${i+1}° comprador:`}</h2>
                        <input placeholder="Digite seu nome..." onChange={(e) => usersName(e.target.value,i)}></input>
                    </div>
                    <div>
                        <h2>{`CPF do ${i+1}° comprador:`}</h2>
                        <input placeholder="Digite seu CPF..." onChange={(e) => usersCpf(e.target.value,i)}></input>
                    </div>
                </DataUser>
            )})}
        </DataUsersContainer>
        </>
    )
}
function TypeSeats() {
    const typeSeat = [
        {type:'selected',name:'Selecionado'},
        {type:'available',name:'Disponível'},
        {type:'unavailable',name:'Indisponível'}]
    return(
        <TypeSeatsContainer>
            {typeSeat.map(({type,name})=>(
                <TypeSeat>
                    <Seat className={type}></Seat>
                    {name}
                </TypeSeat>
            ))}
        </TypeSeatsContainer>
    )
}


const SelectSeatH1 = styled.div`
    width: 100%;
    min-height: 102px;
    margin-bottom: 11px;

    position: sticky;
    top: 67px;
    
    font-family: Roboto;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    
    color: #293845;
`;
const DataUsersContainer = styled.div`
    overflow: scroll;
    min-height: 160px;
`
const DataUser = styled.div`
    box-sizing: border-box;
    padding: 0 25px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap:7px;
    input{
    width: 100%;
    height: 51px;

    box-sizing: border-box;
    padding-left: 18px;

    font-family: Roboto;
    font-style: italic;
    font-size: 18px;
    line-height: 21px;
    
    color: #AFAFAF;
    background: #FFFFFF;

    border: 1px solid #D5D5D5;
    border-radius: 3px;
    }
    h2{
    width: 100%;
    height: 25px;
    
    font-family: Roboto;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    
    color: #293845;
    }
    `
const ReserveSeat = styled.div`
    width: 100%;
    height: 130px;
    min-height: 60px;
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    `

const Button = styled.button`
    width: 225px;
    height: 42px;
    
    
    border-radius: 3px;
    border: 0;
    
    font-family: Roboto;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.04em;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    color: #FFFFFF;
    background: #E8833A;
    `
const Seats = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;

    box-sizing: border-box;
    padding: 0 25px;
`

const Seat = styled.div`
    width: 26px;
    height: 26px;

    display: flex;
    align-items: center;
    justify-content: center;
    
    box-sizing: border-box;
    border-radius: 12px;

    margin-bottom: 11px;
    
    font-family: Roboto;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: 0.04em;
    
    border: 1px solid #808F9D;
    background: #C3CFD9;
    color: #000000;
    
    
    &.selected{
        width: 26px;
        height: 26px;
        background: #8DD7CF;
        border: 1px solid #45BDB0;
    }
    &available{
        max-width: 26px;
        height: 26px;
        background: #C3CFD9;
        border: 1px solid #808F9D;
    }
    &.unavailable{
        width: 26px;
        height: 26px;
        background: #FBE192;
        border: 1px solid #F7C52B;
    }
    `
const TypeSeat = styled.div`
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;    

    font-family: Roboto;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: -0.013em;

    color: #4E5A65;


`

const TypeSeatsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap:25px;
    margin-bottom: 40px;
`
