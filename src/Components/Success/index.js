import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import "../reset.css"

export default function Success({userData}) {
    console.log(userData)
    let backHome = useNavigate();
    return(
        <>
            <RequestSucces >Pedido feito com sucesso!</RequestSucces>
            <Container>
                Filme e sessão
                <div>
                    <p>{userData.titleMovie}</p>
                    <p>{`${userData.date}  ${userData.nameSession}`}</p>
                </div>
            </Container>
            <Container>
                Ingressos
                <div>
                    {userData.buyers.map(({idAssento}) =>{
                        return(
                            <p>{`Assento ${idAssento}`}</p>
                        )
                    })}
                </div>
            </Container>
            <Container>
                Comprador(es)
                <div>
                    {userData.buyers.map(({nome,cpf})=>(
                        <>
                            <p>{`Nome: ${nome}`}</p>
                            <p>{`CPF: ${cpf}`}</p>
                        </>
                    ))}
                </div>
            </Container>
            <GoBackHome className="back-home">
                    <button onClick={()=>backHome("/")}>Voltar pra Home</button>
            </GoBackHome>
        </>
    )
}

const RequestSucces = styled.div`
    width: 100%;
    height: 102px;
    margin-bottom: 11px;

    box-sizing: border-box;
    padding: 0 90px;
   
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    color: #293845;
    
    font-family: Roboto;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;
    
    background-color: #FFFFFF;
    color: #247A6B;
`
const Container = styled.div`
    box-sizing: border-box;
    padding: 0 25px;

    font-family: Roboto;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    flex-direction: column;
    letter-spacing: 0.04em;
    
    color: #293845;
    p{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;

    color: #293845;
    }
    div{
    margin-bottom: 50px;
    }
`
const GoBackHome = styled.div`
    width: 100%;
    height: 80px;
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    button{
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
    
    background: #E8833A;
    color: #FFFFFF;
}   
`