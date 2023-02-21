import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackArrow = styled(FontAwesomeIcon) `
    display: block;
    padding: 10px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 50px;
    margin-right: 15px;
    cursor:pointer;
    &:hover {
        background-color: rgba(255,255,255,.4);
    }
`;

const ContentIcon = styled.div `
    width: 45px;
    height: 45px;
    border: 1px solid rgba(255,255,255,.8);
    border-radius: 45px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const IconPerson = styled(FontAwesomeIcon) `
    color: white;
    font-size: 22px;
`;

const Img = styled.img `
    height: 100%;
    width: 100%;
    border-radius: 100px;
`;

const HoverImg = styled(Img) `
    &:hover {
        cursor: pointer;
    }
`;

const Header = styled.div `
    background-color: rgb(80,140,190);
    height: 60px;
    color: white;
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 22px;
`;

const ContentPerson = styled.div `
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid rgba(200,200,220,.9);
`;

const ContentFriend = styled(ContentPerson) `
    &:hover {
        background-color: rgb(230,230,230);
        cursor: pointer;
    }
`;

const Icon = styled(FontAwesomeIcon) `
    color: white;
`;

const LoginHeader = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Row = styled.div `
    width: 128px;
    height: 1px;
    background-color: white;
    margin-top: -30px;
    margin-bottom: 5px;
`;

const LoginButton = styled.input `
    display: block;
    border: 1px solid white;
    color: white;
    font-weight: bold;
    margin: auto;
    margin-top: 25px;
    text-align: center;
    width: 85%;
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    background-color: rgba(255,255,255,0.15);
    &:hover {
        background-color: rgba(255,255,255,0.5);
    }
    &:focus {
        outline: none;
    }
`;

const ActionButton = styled.a `
    display: block;
    border: 1px solid white;
    color: white;
    font-weight: bold;
    margin: auto;
    margin-top: 10px;
    text-align: center;
    width: 85%;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    background-color: rgba(255,255,255,0.15);
    &:hover {
        background-color: rgba(255,255,255,0.5);
    }
    &:focus {
        outline: none;
    }
`;

const InputIconContent = styled.div `
    width: 18%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 12px;
    padding-bottom: 12px;
`;

const IconAnimation = keyframes `
    0% { transform: rotate(20deg) }
    20% { transform: rotate(-20deg) }
    40% { transform: rotate(20deg) }
    60% { transform: rotate(-20deg) }
    80% { transform: rotate(20deg) }
    100% { transform: rotate(0deg) }
`;

const IconError = styled(FontAwesomeIcon) `
    color: rgb(255,80,60);
    animation: ${IconAnimation} 1s;
`;

const LoginTopIcon = styled(FontAwesomeIcon) `
    color: rgba(255,255,255,0.9);
    font-size: 40px;
`;

const LoginContentInput = styled.div `
    width: 85%;
    display: flex;
    border: 1px solid white;
    border-radius: 5px;
    margin: auto;
    margin-top: 15px;
`;

const LoginInput = styled.input `
    width: 82%;
    border: none;
    font-size: 15px;
    padding-left: 8px;
    &:focus {
        outline: none;
    }
`;

const ContentErrorMessage = styled.div `
    padding:0;
    margin:0;
    width: 85%;
    margin-left: 7.5%;
    color: #FFBC40;
    font-size: 14px;
`;

export { 
    BackArrow,
    ContentIcon,
    IconPerson,
    Img,
    Header,
    ContentPerson,
    ContentFriend,
    Icon,
    LoginHeader,
    Row,
    LoginButton,
    ActionButton,
    InputIconContent,
    IconError,
    LoginTopIcon,
    LoginContentInput,
    LoginInput,
    HoverImg,
    ContentErrorMessage
};