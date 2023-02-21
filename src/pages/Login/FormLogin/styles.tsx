import styled from 'styled-components';
import { Checkbox } from 'pretty-checkbox-react';

export interface Config {
    size?: number,
    color?: string
}

const ContentIcon = styled.div `
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
`;

const Check = styled(Checkbox) `
    margin-left: 7.5%;
    margin-top: 20px;
    color: rgba(255,255,255,.9);
`;

export { ContentIcon, Check };