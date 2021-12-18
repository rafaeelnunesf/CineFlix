import styled from "styled-components"
import "../reset.css"

export default function Footer({URL,title,weekday,name}){
    let dateInfo = `${weekday} - ${name}`
    if(weekday === undefined || name ===undefined){
        dateInfo = ""
    }
    return(
        <Container>
            <ImageContainer>
                <img src={URL} alt={title} />
            </ImageContainer>
            <Info>
                <p className="title">{title}</p>
                <p className="date">{dateInfo}</p>
            </Info>
        </Container>
    )
}
const Container = styled.div`
    width: 100%;
    height: 117px;
    position: sticky;
    bottom: 0px;
    margin-top: 11px;

    box-sizing: border-box;
    padding: 10px 0 14px 10px;

    display: flex;
    gap: 14px;
    justify-content: space-between;
    
    background: #DFE6ED;
    border-top: 1px solid #9EADBA;
`
const Info = styled.div`
    width: 287px;
    display: flex;
    flex-direction: column;
    text-align:start;
    justify-content: center;
    p{
    width: 100%;
    left: 88px;
    bottom: 39px;
    
    font-family: Roboto;
    font-size: 25px;
    line-height: 30px;
    display: flex;
    align-items: center;
    
    color: #293845;
}
`
const ImageContainer = styled.div`
    width: 64px;
    height: 89px;

    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    & img{
    width: 48px;
    height: 72px;
    }
`