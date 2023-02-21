import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContentInviteFriend = styled.div `
    border-bottom: 1px solid rgba(180,180,180,.9);
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    font-size: 18px;
    color: rgba(0,0,0,0.7);
`;

const ContentUserInfo = styled.div `
    display: flex;
    align-items: center;
`;

const ContentAvatar = styled.div `
    height: 40px;
    width: 40px;
    border: 1px solid rgba(180,180,180,.9);
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
`;

const IconPerson = styled(FontAwesomeIcon) `
    font-size: 25px;
    color: rgba(0,0,0,.5);
`;

const TextName = styled.p `
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const AddButton = styled.a `
    width: 15%;
    height: 35px;
    background-color: blue;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    background-color: rgba(0,0,255,.65);
    &:hover {
        background-color: rgba(0,0,255,.85);
    }
`;

const ContentInput = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
`;

const Input = styled.input `
    font-family: 'Quicksand';
    width: 75%;
    font-size: 14px;
    padding: 7px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 30px;
    border: none;
    &:focus {
        outline: none;
    }
`;

const SearchBtn = styled.a `
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1E90FF;
    width: 37px;
    height: 37px;
    border-radius: 37px;
    cursor: pointer;
    &:hover {
        background-color: rgba(30,144,255,0.6);
    }
`;


const ContentPersons = styled.div `
    margin-top: 15px;
    border-top: 1px solid rgba(200,200,220,.9);
`;

const Text = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: rgb(110,110,110);
    margin-top: 15px;
`;

const ContentLoader = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;

export { ContentInviteFriend, ContentAvatar, IconPerson, TextName, AddButton, ContentUserInfo, ContentInput, Input, SearchBtn, ContentPersons, Text, ContentLoader };
