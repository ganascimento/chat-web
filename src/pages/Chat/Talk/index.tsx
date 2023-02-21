import React from 'react';
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import * as styled from './styles';
import * as commonStyled from './../../../commonStyles/styles';

export interface StateProps {
    id: number;
    name: string;
    lastMessage?: string;
    avatar?: string;
    checkOwner(userId: number):boolean;
    handleSetTalk(userId: number):void;
    checkPending(userId: number):number;
}

const Talk = (props: StateProps) => {

    const pendingMessages = props.checkPending(props.id);
    
    return (
        <styled.ContentTalk onClick={() => { props.handleSetTalk(props.id) }}>
            <styled.ContentUserInfo>
                <styled.ContentUserImg>
                    {
                        props.avatar ? <commonStyled.Img src={props.avatar} /> : <styled.Icon icon={faUser} />
                    }
                </styled.ContentUserImg>
                <styled.ContentInfos>
                    <styled.TextName>
                        { props.name }
                    </styled.TextName>
                    <styled.TextLastMessage>
                        {
                            props.checkOwner(props.id) ? <styled.IconMyMessage icon={faCheck} /> : null
                        }
                        {
                            props.lastMessage ? props.lastMessage : null
                        }
                    </styled.TextLastMessage>
                </styled.ContentInfos>
            </styled.ContentUserInfo>
            {
                pendingMessages > 0 ? <styled.ContentPendMessage>{ pendingMessages <= 9 ? pendingMessages : '9+' }</styled.ContentPendMessage> : null
            }
        </styled.ContentTalk>
    );
}

export default Talk;