import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContentTalk = styled.div `
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.5px solid rgba(200,200,200,.4);
    cursor:pointer;
    &:hover {
        background-color: rgba(230,230,230);
    }
`;

const ContentUserInfo = styled.div `
    width: 86%;
    display: flex;
    align-items: center;
`;

const ContentUserImg = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border: 0.5px solid rgb(190,190,190);
    border-radius: 50px;
    margin-left: 15px;
`;

const Icon = styled(FontAwesomeIcon) `
    color: rgb(160,160,170);
    font-size: 18px;
`;

const ContentInfos = styled.div `
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    margin-left: 15px;
    width: calc(100% - 85px);
`;

const TextName = styled.p `
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
    padding: 0;    
`;

const TextLastMessage = styled(TextName) `
    font-size: 13px;
    margin-top: 5px;
`;

const IconMyMessage = styled(FontAwesomeIcon) `
    color: rgb(150,170,225);
    margin-right: 5px;
`;

const ContentPendMessage = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: dodgerblue;
    margin-right: 7%;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    font-size: 13px;
    color: white;
    font-weight: bold;
`;

export { ContentTalk, ContentUserInfo, ContentUserImg, Icon, TextName, ContentInfos, TextLastMessage, IconMyMessage, ContentPendMessage };