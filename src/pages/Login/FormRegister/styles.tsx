import styled from 'styled-components';

export interface Config {
    size?: number,
    color?: string
}

const ContentFileUpload = styled.label `
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    border: 1px solid white;   
    margin: auto;
    margin-top: -50px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    &:hover {
        background-color: rgba(255,255,255,0.5)
    }
`;

const UploadFile = styled.input `
    display:none;
`;

export { ContentFileUpload, UploadFile };