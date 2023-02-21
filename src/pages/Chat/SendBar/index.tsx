import React, { useState } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import signalR from './../../../services/signalr';
import { TalkState, Talk } from './../../../store/Talk/types';
import { UserState } from './../../../store/User/types';
import { TalkDispatcher } from './../../../store/Talk/actions';
import { Message } from './../../../store/Message/types';
import { ApplicationState } from './../../../store/rootReducer';
import { SelectedTalkState } from '../../../store/SelectedTalk/types';
import * as styled from './styles';
import * as commonStyled from './../../../commonStyles/styles';

export interface StateProps {
    selectedTalk: SelectedTalkState;
}

const SendBar = (props: StateProps) => {

    const [text, setText] = useState<string>('');
    const userState: UserState = useSelector<ApplicationState, UserState>((state: ApplicationState) => state.user);
    const talksState: TalkState = useSelector<ApplicationState, TalkState>((state: ApplicationState) => state.talk);
    const dispatch: Dispatch = useDispatch();
    const talkDispatcher = new TalkDispatcher(dispatch);

    const handleChangeText = (event: React.FormEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
    }

    const handleOnKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13) {
            handleSendMessage();
        }
    }

    const handleSendMessage = () => {
        if (text === null || text.trim() === '') {
            return;
        }

        const message: Message = {
            ehSent: true,
            id: 0,
            pending: true,
            text: text,
            sendDate: new Date()
        };

        props.selectedTalk.data?.messages.push(message);

        talkDispatcher.setTalk(talksState.data as Talk[]);
        
        signalR.connection.invoke('SendMessage', {
            UserSentId: userState.data?.id,
            ConversationId: props.selectedTalk.data?.conversationId,
            Text: text,
            Pending: true,
            SendDate: format(Date.now(), 'yyyy-MM-dd hh:mm:ss').replace(' ', 'T'),
        }, props.selectedTalk.data?.friendId);

        setText('');
    }

    return (
        <styled.ContentSendBar>
            <styled.InputMsg value={text} onChange={handleChangeText} onKeyDown={handleOnKeyDown} />
            <styled.SendBtn onClick={handleSendMessage}>
                <commonStyled.Icon icon={faPaperPlane} />
            </styled.SendBtn>
        </styled.ContentSendBar>
    );
}

export default SendBar;