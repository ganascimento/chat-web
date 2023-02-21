import styled from 'styled-components';

export interface Config {
    size?: number
}

const Main = styled.div `
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: linear-gradient(135deg, #EE82EE, #FF00FF, #BA55D3, #8A2BE2, #1E90FF, #0080ff, #0040ff, #0000ff);
    overflow-x: auto;
`;

const Body = styled.div `
    height: ${(props: Config) => props.size ? props.size : '360'}px;
    width: 350px;    
    border-bottom: 1px solid white;
    margin-bottom: 50px;
`;

const Footer = styled.div `
    font-weight: bold;
    font-size: 15px;
    margin-top: 10px;
    color: rgba(255,255,255,0.9);
`;

const LoadText = styled.p `
    color:  white;
    font-size: 22px;
`;

export { Main, Body, Footer, LoadText };