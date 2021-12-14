import Header from "../Header"
import "../reset.css"
import "./style.css"

export default function Success() {
    const object =
        {
            "id": 1,
            "name": "15:00",
            "day": {
                    "id": 24062021,
              "weekday": "Quinta-feira",
              "date": "24/06/2021",
                },
            "movie": {
                "id": 1,
                "title": "2067",
                "posterURL": "https://image.tmdb.org/t/p/w500/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg",
                "overview": "A lowly utility worker is called to the future by a mysterious radio signal, he must leave his dying wife to embark on a journey that will force him to face his deepest fears in an attempt to change the fabric of reality and save humankind from its greatest environmental crisis yet.",
                "releaseDate": "2020-10-01T00:00:00.000Z",
            },
            "seats": [
                        {
                    "id": 1,
                    "name": "1",
                    "isAvailable": false,
                },
                {
                    "id": 2,
                    "name": "2",
                    "isAvailable": true,
                },
                {
                    "id": 3,
                    "name": "3",
                    "isAvailable": true,
                },
                {
                    "id": 4,
                    "name": "4",
                    "isAvailable": true,
                }
            ]
        }
        const user = {
            ids: [1, 2, 3],
            name: "Fulano",
            cpf: "12345678900"
            }
    return(
        <>
            <Header></Header>
            <h1>Pedido feito com sucesso!</h1>
            <div className="movie-session">
                Filme e sessão
                <div>
                    <p>{object.movie.title}</p>
                    <p>{`${object.day.date}  ${object.name}`}</p>
                </div>
            </div>
            <div className="tickets">
                Ingressos
                <div>
                    {object.seats.map(item =>{
                        return(
                            <p>{`Assento ${item.id}`}</p>
                        )
                    })}
                </div>
            </div>
            <div className="buyer">
                Comprador
                <div>
                    <p>{`Nome: ${user.name}`}</p>
                    <p>{`CPF: ${user.cpf}`}</p>
                </div>
            </div>
            <div className="back-home">
                <button>Voltar pra Home</button>
            </div>
        </>
    )
}