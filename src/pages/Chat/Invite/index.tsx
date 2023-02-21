import React, { useState } from 'react';
import { faArrowLeft, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { format } from 'date-fns';
import { ApplicationState } from './../../../store/rootReducer';
import { InviteDispatcher } from './../../../store/Invite/actions';
import { InviteState, Person } from './../../../store/Invite/types';
import { UserState } from './../../../store/User/types';
import signalR from './../../../services/signalr';
import * as styled from './styles';
import * as commonStyled from './../../../commonStyles/styles';

interface StateProps {
    toggleMenu(): void;
}

const Invite = (props: StateProps) => {
    const [text, setText] = useState<string>('');
    const inviteState: InviteState = useSelector<ApplicationState, InviteState>((state: ApplicationState) => state.invite);
    const userState: UserState = useSelector<ApplicationState, UserState>((state: ApplicationState) => state.user);
    const dispatch: Dispatch = useDispatch();
    const inviteDispatcher = new InviteDispatcher(dispatch);
    
    const changeSearchText = (event: React.FormEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
    }

    const handleSearch = () => {
        if (text.trim() === null || text.trim() === '') return;

        inviteDispatcher.loadRequest(text);
    }

    const handleSendInvite = (userId: number) => {
        signalR.connection.invoke('SendInvite', {
            Refused: false,
            UserReceivedId: userId,
            UserSentId: userState.data?.id,
            RequestDate: format(Date.now(), 'yyyy-MM-dd hh:mm:ss').replace(' ', 'T')
        });

        const persons = inviteState.data?.map((person: Person) => {
            if (person.id === userId) person.ehSent = true;
            return person;
        });

        inviteDispatcher.setPersons(persons as Person[]);
    }

    const friendContent = (person: Person) => (
        <commonStyled.ContentPerson key={person.id}>
            <styled.ContentUserInfo>
                <styled.ContentAvatar>
                    {
                        person.avatar ? <commonStyled.Img src={person.avatar}/> : <styled.IconPerson icon={faUser}/>
                    }
                </styled.ContentAvatar>
            <styled.TextName>
                { person.name }
            </styled.TextName>
            </styled.ContentUserInfo>
            {
                !person.ehSent ? <styled.AddButton onClick={() => { handleSendInvite(person.id); }}>Add</styled.AddButton> : null
            }
        </commonStyled.ContentPerson>
    );

    const loading = () => (
        <styled.ContentLoader>
            <Loader type="Oval" color="blue" height={30}/>
        </styled.ContentLoader>
    );

    return (
        <>
            <commonStyled.Header>
                <commonStyled.BackArrow icon={faArrowLeft} onClick={props.toggleMenu} />
                Adicionar amigo
            </commonStyled.Header>
            <styled.ContentInput>
                <styled.Input type="text" placeholder="Nome ou e-mail" value={text} onChange={changeSearchText} />
                <styled.SearchBtn onClick={handleSearch}>
                    <commonStyled.Icon icon={faSearch} />
                </styled.SearchBtn>
            </styled.ContentInput>
            <styled.ContentPersons>
                {
                    !inviteState.data && !inviteState.loading ?
                    <styled.Text>Nenhum resultado</styled.Text> : 
                    inviteState.loading ?
                    loading() :
                    inviteState.data?.map((person: Person) => {
                        return friendContent(person)
                    })
                }
            </styled.ContentPersons>
        </>
    );
}

export default Invite;