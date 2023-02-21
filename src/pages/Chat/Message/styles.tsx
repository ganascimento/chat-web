import styled from 'styled-components';

const CommonContent = styled.div `
    max-width: 65%;
    word-break: break-all;
    box-shadow: 1px 2px 3px rgb(100,100,120);
    padding: 8px;
    padding-left: 12px;
    padding-right: 10px;
    margin-top: 12px;
`;

const ContentLeftMessage = styled(CommonContent) `
    background-color: rgb(240,240,255);
    float: left;
    margin-left: 20px;
    border-radius: 0px 10px 10px 10px;
`;

const ContentRightMessage = styled(CommonContent) `
    background-color: rgb(135,206,255);
    float: right;
    margin-right: 20px;
    border-radius: 10px 0px 10px 10px;
`;

export { ContentLeftMessage, ContentRightMessage };