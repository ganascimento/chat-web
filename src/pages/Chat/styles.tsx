import styled, { keyframes } from 'styled-components';

export interface Config {
    size?: string;
    width?: number;
    color?: string;
    shadow?: string;
}

export interface ConfigAnimation {
    start: number;
}

const CommonFlex = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Main = styled(CommonFlex) `
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(135deg, #EE82EE, #FF00FF, #BA55D3, #8A2BE2, #1E90FF, #0080ff, #0040ff, #0000ff);
    overflow-x: auto;    
`;

const Body = styled.div `
    height: 92%;
    width: 1400px;
    @media (max-width: 1400px) {
        height: 100%;
        width: 100%;
    }
`;

const Section = styled.div `
    height: 100%;
    float: left;
    position: relative;
    overflow:hidden;
`;

const TalkSection = styled(Section) `
    width: 30%;
    background-color: rgb(245,245,250);
    @media (max-width: 1020px) {
        width: 40%;
    }
`;

const MessageSection = styled(Section) `
    width: 70%;
    background-color: rgb(235,235,235);
    @media (max-width: 1020px) {
        width: 60%;
    }
`;

const BarSection = styled(CommonFlex) `
    background-color: rgb(70,130,180);
    width: 100%;
    height: 60px;
    box-shadow: ${(props: Config) => props.shadow ? props.shadow : null};
    color: white;
    overflow-y: auto;
`;

const ContentMessage = styled.div `
    width: 100%;
    height: calc(100% - 125px);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const ContentSendBar = styled.div `
    width: 100%;
    height: 65px;
`;

const OpenMenuFriends = keyframes `
    0% { left: -100%; }
    100% { left: 0%; }
`;

const CloseMenuFriends = keyframes `
    0% { left: 0%; }
    100% { left: -100%; }
`;

const FriendsMenu = styled.div `
    background-color: rgb(240,240,255);
    height: 100%;
    width: 100%;
    position: absolute;
    left: ${(props: ConfigAnimation) => props.start === 1 ? 0 : 100}%;
    top: 0;
    animation: ${(props: ConfigAnimation) => props.start === 1 ? OpenMenuFriends : (props.start === 2 ? CloseMenuFriends : null)} 0.8s;
`;

const LoadText = styled.div `
    color: white;
    font-size: 22px;
    margin-bottom: 25px;
`;

const ContentLoad = styled(CommonFlex) `
    flex-direction: column;
`;

const ContentNoTalk = styled(CommonFlex) `
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
    color: white;
    font-size: 25px;
`;

const ContentFriendBar = styled(CommonFlex) `
    width: 100%;
    justify-content: flex-start;
    margin-left: 10px;
`;

const ContentFriendBarTexts = styled(CommonFlex) `
    margin-left: 10px;
    align-items: flex-start;
    flex-direction: column;
`;

const ContentFriendBarOnline = styled.p `
    font-size: 12px;
    margin: 0;
    padding: 0;
    margin-top: 3px;
`;

const ContentViewImg = styled.div `
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    top:0;
    left:0;
    background-color: rgba(0,0,0,.3);
`;

const ViewImg = styled.img `
    box-shadow: 4px 4px 6px rgba(0,0,0,.6)
`;

export { 
    Main,
    Body,
    Section,
    BarSection,
    ContentMessage,
    ContentSendBar,
    FriendsMenu,
    LoadText,
    ContentLoad,
    ContentNoTalk,
    ContentFriendBar,
    ContentFriendBarTexts,
    ContentFriendBarOnline,
    TalkSection,
    MessageSection,
    ContentViewImg,
    ViewImg
};