import React, { useState } from 'react';
import { faArrowLeft, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from './../../../store/rootReducer';
import { InviteDispatcher } from './../../../store/Invite/actions';
import { FriendState, Friend } from './../../../store/Friend/types';
import { InviteState, Invitation } from './../../../store/Invite/types';
import signalR from './../../../services/signalr';
import Invite from './../Invite/index';
import * as styled from './styles';
import * as commonStyled from './../../../commonStyles/styles';

enum TypeAnimation {
    Default = 0,
    Open = 1,
    Close = 2
}

interface StateProps {
    toggleMenu(): void;
    handleSetTalk(userId: number):void;
}

const Friends = (props: StateProps) => {
    const friendState: FriendState = useSelector<ApplicationState, FriendState>((state: ApplicationState) => state.friend);
    const inviteState: InviteState = useSelector<ApplicationState, InviteState>((state: ApplicationState) => state.invite);
    const [startAnimation, setStartAnimation] = useState<number>(TypeAnimation.Default);
    const dispatch: Dispatch = useDispatch();
    const invitationDispatcher = new InviteDispatcher(dispatch);

    const handleToggleMenuInvite = () => {
        if (startAnimation === TypeAnimation.Default || startAnimation === TypeAnimation.Close) setStartAnimation(TypeAnimation.Open);
        else if (startAnimation === TypeAnimation.Open) setStartAnimation(TypeAnimation.Close);
    }

    const handleAceptInvite = (inviteId: number) => {
        signalR.connection.invoke('AceptInvite', inviteId);
        adjustInvites(inviteId);
    }

    const handleDeclineInvite = (inviteId: number) => {
        signalR.connection.invoke('DeclineInvite', inviteId);
        adjustInvites(inviteId);
    }

    const adjustInvites = (inviteId: number) => {
        const invites = inviteState.invites?.filter((item: Invitation) => {
            if (item.id !== inviteId) return item;
        });

        invitationDispatcher.setInvites(invites as Invitation[]);
    }

    const handleSelectTalk = (id: number) => {
        props.handleSetTalk(id);
        props.toggleMenu();
    }

    const personContent = (id: number, name: string, avatar: string | null = null) => (
        <commonStyled.ContentFriend key={id} onClick={ () => { handleSelectTalk(id); } }>
            <styled.ContentUserInfo>
                <styled.ContentAvatar>
                    {
                        avatar ? <commonStyled.Img src={avatar}/> : <styled.IconPerson icon={faUser}/>
                    }
                </styled.ContentAvatar>
            <styled.TextName>
                { name }
            </styled.TextName>
            </styled.ContentUserInfo>
        </commonStyled.ContentFriend>
    );

    const inviteContent = (id: number, name: string, avatar: string | null = null, idInvite: number) => (
        <commonStyled.ContentPerson key={id}>
            <styled.ContentUserInfo>
                <styled.ContentAvatar>
                    {
                        avatar ? <commonStyled.Img src={avatar}/> : <styled.IconPerson icon={faUser}/>
                    }
                </styled.ContentAvatar>
            <styled.TextName>
                { name }
            </styled.TextName>
            </styled.ContentUserInfo>
            {
                <styled.ContentInviteBtn>
                    <styled.InviteButton onClick={() => { handleDeclineInvite(idInvite as number) }} backColor="rgba(255,0,0,.65)" backColorHover="rgba(255,0,0,.85)" >X</styled.InviteButton>
                    <styled.InviteButton onClick={() => { handleAceptInvite(idInvite as number) }} >Add</styled.InviteButton>
                </styled.ContentInviteBtn>
            }
        </commonStyled.ContentPerson>
    );

    return (
        <>
            <styled.ContentInvite start={startAnimation}>
                <Invite toggleMenu={handleToggleMenuInvite} />
            </styled.ContentInvite>
            <commonStyled.Header>
                <commonStyled.BackArrow icon={faArrowLeft} onClick={props.toggleMenu}/>
                Amigos
                <styled.ContentPlusIcon>
                    <commonStyled.BackArrow icon={faPlus} onClick={handleToggleMenuInvite}/>
                </styled.ContentPlusIcon>
            </commonStyled.Header>
            {
                inviteState.invites ? <styled.ContentTag>Convites</styled.ContentTag> : null
            }
            {
                inviteState.invites?.map((item: Invitation) => (
                    inviteContent(item.person.id, item.person.name, item.person.avatar, item.id)
                ))
            }
            <styled.ContentTag>Amigos</styled.ContentTag>
            {
                friendState.data?.map((item: Friend) => (
                    personContent(item.id, item.name, item.avatar)
                ))
            }
        </>
    );
}

export default Friends;