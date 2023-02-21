import styled from 'styled-components';

const ContentSendBar = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(186,206,232);
`;

const InputMsg = styled.input `
    font-family: 'Quicksand';
    width: 85%;
    font-size: 16px;
    padding: 7px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 30px;
    border: none;
    &:focus {
        outline: none;
    }
`;

const SendBtn = styled.a `
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(30,144,225);
    width: 50px;
    height: 50px;
    border-radius: 50px;
    cursor: pointer;
    &:hover {
        background-color: rgba(30,144,255,0.6);
    }
`;

export { ContentSendBar, InputMsg, SendBtn };