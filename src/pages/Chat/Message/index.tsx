import React from 'react';
import * as styled from './styles';

export interface StateProps {
    sent: boolean;
    text: string;
}

const Message = (props: StateProps) => {
    return (
        <div>
            {
                props.sent ? <styled.ContentRightMessage>{ props.text }</styled.ContentRightMessage> : <styled.ContentLeftMessage>{ props.text }</styled.ContentLeftMessage>
            }
        </div>
    );
}

export default Message;