import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ConfigAnimation {
    start: number;
}

export interface Config {
    backColor?: string;
    backColorHover?: string;
}

const ContentTag = styled.div `
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

const InviteButton = styled.a `
    width: 40%;
    height: 35px;
    margin-left: 5%;
    background-color: blue;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    background-color: ${(props: Config) => props.backColor ? props.backColor : 'rgba(0,0,255,.65)'};
    &:hover {
        background-color: ${(props: Config) => props.backColorHover ? props.backColorHover : 'rgba(0,0,255,.85)'};
    }
`;

const ContentPlusIcon = styled.div `
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;

const OpenMenuInvite = keyframes `
    0% { top: 100%; }
    100% { top: 0%; }
`;

const CloseMenuInvite = keyframes `
    0% { top: 0%; }
    100% { top: 100%; }
`;

const ContentInvite = styled.div `
    background-color: rgb(220,230,245);
    height: 100%;
    width: 100%;
    position: absolute;
    top: ${(props: ConfigAnimation) => props.start === 1 ? 0 : 100}%;
    animation: ${(props: ConfigAnimation) => props.start === 1 ? OpenMenuInvite : (props.start === 2 ? CloseMenuInvite : null)} 0.8s;
`;

const ContentInviteBtn = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32%;
`;

export { ContentTag, ContentAvatar, IconPerson, TextName, InviteButton, ContentUserInfo, ContentInvite, ContentPlusIcon, ContentInviteBtn };
