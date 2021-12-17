import { useNavigate } from "react-router-dom"
import "../reset.css"
import "./style.css"

export default function Success({userData}) {
    console.log(userData)
    /* {
        ids: [1, 2, 3], // ids dos assentos
        compradores: [
            { idAssento: 1, nome: "Fulano", cpf: "12345678900" },
            { idAssento: 2, nome: "Fulano 2", cpf: "12345678901" },
            { idAssento: 3, nome: "Fulano 3", cpf: "12345678902" },
        ]
    } */
    let backHome = useNavigate();
    return(
        <>
            <h1 className="request-success">Pedido feito com sucesso!</h1>
            <div className="movie-session">
                Filme e sessão
                <div>
                    <p>{userData.titleMovie}</p>
                    <p>{`${userData.date}  ${userData.nameSession}`}</p>
                </div>
            </div>
            <div className="tickets">
                Ingressos
                <div>
                    {userData.buyers.map(({idAssento}) =>{
                        return(
                            <p>{`Assento ${idAssento}`}</p>
                        )
                    })}
                </div>
            </div>
            <div className="buyer">
                Comprador(es)
                <div>
                    {userData.buyers.map(({nome,cpf})=>(
                        <>
                            <p>{`Nome: ${nome}`}</p>
                            <p>{`CPF: ${cpf}`}</p>
                        </>
                    ))}
                </div>
            </div>
            <div className="back-home">
                    <button onClick={()=>backHome("/")}>Voltar pra Home</button>
            </div>
        </>
    )
}