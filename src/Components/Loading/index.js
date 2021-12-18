import styled from "styled-components"
import "../reset.css"

export default function Loading(){
    return(
        <>
            <Container>
                <Icon>
                    <div></div><div><div></div></div>
                </Icon>
            </Container>
            <H1loading>Carregando</H1loading>
        </>
    )
}

const H1loading = styled.h1`
    width: 100%;
    min-height: 102px;

    position: sticky;
    top: 67px;
    
    font-family: Roboto;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;

    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: transparent;
    position: relative;
    margin: 0 auto;    
    top: 255px;
    color: #e8833a;
`
const Container = styled.div`
    box-sizing: border-box;
    width: 68px;
    height: 68px;
    display: inline-block;
    overflow: hidden;
    background: #fff;
    position: relative;
    margin: 0 auto;    
    top: 280px;
`
const Icon = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(0.68);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */

    & div { box-sizing: border-box!important }
    & > div {
    position: absolute;
    width: 80px;
    height: 80px;
    top: 10px;
    left: 10px;
    border-radius: 50%;
    border: 12px solid #000;
    border-color: #e8833a transparent #e8833a transparent;
    animation: icon 1.1111111111111112s linear infinite;
}
    & > div:nth-child(2) { border-color: transparent }
    & > div:nth-child(2) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
    }
    & > div:nth-child(2) div:before, .icon > div:nth-child(2) div:after { 
    content: "";
    display: block;
    position: absolute;
    width: 12px;
    height: 12px;
    top: -12px;
    left: 22px;
    background: #e8833a;
    border-radius: 50%;
    box-shadow: 0 68px 0 0 #e8833a;
    }
    & > div:nth-child(2) div:after { 
    left: -12px;
    top: 22px;
    box-shadow: 68px 0 0 0 #e8833a;
    }
    div { box-sizing: content-box; }
`