import styled from 'styled-components';

const ContentUserInfoBar = styled.div `
    width: 74%;
    display: flex;
    align-items: center;
    
`;

const ContentRightIcon = styled.div `
    width: 13%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 15px;
    cursor:pointer;
    border-radius: 15px;
    &:hover {
        background-color: rgba(255,255,255,.2);
    }
`;

const TextName = styled.p `
    display: block;
    margin-left: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export { ContentUserInfoBar, ContentRightIcon, TextName };