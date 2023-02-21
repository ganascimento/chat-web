import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import signalR from './../../../services/signalr';
import { ApplicationState } from './../../../store/rootReducer';
import { UserState } from './../../../store/User/types';
import { logout } from './../../../services/auth';
import ModalLogout from './../ModalLogout/index';
import * as styled from './styles';
import * as commonStyled from './../../../commonStyles/styles';

export interface StateProps {
    toggleMenu(): void;
    toggleImg(): void;
}

const UserInfoBar = (props: StateProps) => {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [logoutChat, setLogoutChat] = useState<boolean>(false);
    const userState: UserState = useSelector<ApplicationState, UserState>((state: ApplicationState) => state.user);

    const handleModalLogout = () => {
        setOpenModal(!openModal);
    }

    const handleLogout = () => {
        logout();
        setLogoutChat(true);
        signalR.Stop();
    }

    return (
        <>
            {
                logoutChat ? <Redirect to="/chat" /> : null
            }
            <ModalLogout openModal={openModal} handleOpenModel={handleModalLogout} handleLogout={handleLogout} />
            <styled.ContentUserInfoBar>
                <commonStyled.ContentIcon>
                    {
                        userState.data?.avatar ? <commonStyled.HoverImg src={userState.data?.avatar} onClick={props.toggleImg} /> : <commonStyled.IconPerson icon={faUser} />
                    }
                </commonStyled.ContentIcon>
                <styled.TextName>
                    { userState.data?.name }
                </styled.TextName>                            
            </styled.ContentUserInfoBar>
            <styled.ContentRightIcon onClick={props.toggleMenu}>
                <FontAwesomeIcon icon={faUsers} />
            </styled.ContentRightIcon>
            <styled.ContentRightIcon onClick={handleModalLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </styled.ContentRightIcon>
        </>
    );
}

export default UserInfoBar;