import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import Loader from 'react-loader-spinner';
import signalR from './../../services/signalr';
import { isAuthenticated, getToken } from './../../services/auth';
import { ApplicationState } from './../../store/rootReducer';
import { UserDispatcher } from './../../store/User/actions';
import { TalkDispatcher } from './../../store/Talk/actions';
import { InviteDispatcher } from './../../store/Invite/actions';
import { FriendDispatcher } from './../../store/Friend/actions';
import { SelectedTalkDispatcher } from './../../store/SelectedTalk/actions';
import { UserState } from './../../store/User/types';
import { TalkState, Talk } from './../../store/Talk/types';
import { Message } from './../../store/Message/types';
import { FriendState, Friend } from './../../store/Friend/types';
import { SelectedTalkState } from './../../store/SelectedTalk/types';
import { InviteState, Invitation, Person } from './../../store/Invite/types';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import TalkContent from './Talk/index';
import MessageContent from './Message/index';
import SendBar from './SendBar/index';
import FriendsContent from './Friends/index';
import UserInfoBar from './UserInfoBar/index';
import * as styled from './styles';
import * as commonStyled from './../../commonStyles/styles';

enum TypeAnimation {
    Default = 0,
    Open = 1,
    Close = 2
}

interface ChatPerson {
    id?: number;
    avatar?: string;
    lastMessage?: string;
    name?: string;
}

const Chat = () => {

    const [people, setPeople] = useState<ChatPerson[]>([]);
    const [startAnimation, setStartAnimation] = useState<number>(TypeAnimation.Default);
    const [ehRegister, setEhRegister] = useState<boolean>(true);
    const [ehModalImgFriend, setEhModalImgFriend] = useState<boolean>(false);
    const [ehModalMyImg, setEhModalMyImg] = useState<boolean>(false);
    const userState: UserState = useSelector<ApplicationState, UserState>((state: ApplicationState) => state.user);
    const talkState: TalkState = useSelector<ApplicationState, TalkState>((state: ApplicationState) => state.talk);
    const friendState: FriendState = useSelector<ApplicationState, FriendState>((state: ApplicationState) => state.friend);
    const inviteState: InviteState = useSelector<ApplicationState, InviteState>((state: ApplicationState) => state.invite);
    const selectedTalkState: SelectedTalkState = useSelector<ApplicationState, SelectedTalkState>((state: ApplicationState) => state.selectedTalk);
    const dispatch: Dispatch = useDispatch();
    const userDispatcher = new UserDispatcher(dispatch);
    const talkDispatcher = new TalkDispatcher(dispatch);
    const invitationDispatcher = new InviteDispatcher(dispatch);
    const friendDispatcher = new FriendDispatcher(dispatch);
    const selectedTalkDispatcher = new SelectedTalkDispatcher(dispatch);
    const friendSelected = friendState.data?.filter((item: Friend) => item.id === selectedTalkState.data?.friendId)[0];

    useEffect(() => {
        const element: any = document.getElementById('ContentMessage');
        
        if (element) element.scrollTop = element.scrollHeight;
    });

    useEffect(() => {
        if (!userState.authenticated && isAuthenticated()){
            userDispatcher.loadRequest();
        }

        signalR.Start();
    }, []);

    useEffect(() => {
        let peopleList: ChatPerson[] = [];

        talkState.data?.forEach((talk: Talk) => {
            if (talk.messages.length > 0) {
                peopleList.push({
                    id: talk.friendId,
                    lastMessage: talk.messages[talk.messages.length - 1].text
                });
            }
        });

        peopleList = peopleList.map((person: ChatPerson) => {
            friendState.data?.forEach((friend: Friend) => {
                if (person.id === friend.id){
                    person.name = friend.name;
                    person.avatar = friend.avatar;
                }
            });

            return person;
        });

        setPeople(peopleList);

        if (talkState.completed && ehRegister){
            registerEventUseSelectedTalk();
            registerEvents();
            setEhRegister(false);
        }
    }, [talkState]);

    useEffect(() => {
        registerEventUseSelectedTalk();

    }, [selectedTalkState]);

    const registerEventUseSelectedTalk = () => {
        signalR.connection.off('ReceivedMessage');

        signalR.connection.on('ReceivedMessage', (receivedMsg: any) => {
            let talks: Talk[] = talkState.data as Talk[];

            const newMessage: Message = {
                ehSent: false,
                id: 0,
                pending: selectedTalkState.data?.conversationId === receivedMsg.conversationId ? false : true,
                sendDate: receivedMsg.sendDate,
                text: receivedMsg.text
            };

            talks = talks?.map((item: Talk) => {
                if (item.conversationId === receivedMsg.conversationId) item.messages.push(newMessage);

                return item;
            });
            
            talkDispatcher.setTalk(talks);
        });
    }

    const registerEvents = () => {
        signalR.connection.on('ReceivedInvite', (invitation: Invitation, person: Person) => {
            const invites: Invitation[] = inviteState.invites ? inviteState.invites as Invitation[] : [];
            
            person.avatar = person.avatar ? `data:image/png;base64,${person.avatar}` : undefined;

            invites.push({
                id: invitation.id,
                userSentId: invitation.userSentId,
                person: person as Person
            });

            invitationDispatcher.setInvites(invites);
        });

        signalR.connection.on('NewFriend', (conversationId: string, friendUser: Friend) => {
            const friends = friendState.data ? friendState.data as Friend[] : [];

            friendUser.avatar = friendUser.avatar ? `data:image/png;base64,${friendUser.avatar}` : undefined;

            friends.push(friendUser);
            friendDispatcher.setFriends(friends);

            const talks = talkState.data ? talkState.data as Talk[] : [];
            talks.push({
                conversationId,
                messages: [],
                friendId: friendUser.id
            });
            talkDispatcher.setTalk(talks);
        });
        
        signalR.connection.on('UserConnected', (userId: number) => {
            const friends = friendState.data?.map((friend: Friend) => {
                if (friend.id === userId) friend.isOnline = true;

                return friend;
            });

            friendDispatcher.setFriends(friends as Friend[]);
        });

        signalR.connection.on('UserDesconnected', (userId: number) => {
            const friends = friendState.data?.map((friend: Friend) => {
                if (friend.id === userId) friend.isOnline = false;

                return friend;
            });

            friendDispatcher.setFriends(friends as Friend[]);
        });
    }

    const handleToggleMenuFriends = () => {
        if (startAnimation === TypeAnimation.Default || startAnimation === TypeAnimation.Close) setStartAnimation(TypeAnimation.Open);
        else if (startAnimation === TypeAnimation.Open) setStartAnimation(TypeAnimation.Close);
    }

    const handleSetTalk = (personId: number) => {
        let hasPending: boolean = false;

        const talks = talkState.data?.map((talk: Talk) => {
            talk.messages = talk.messages.map((msg: Message) => {
                if (msg.pending) {
                    msg.pending = false;
                    hasPending = true;
                }

                return msg;
            });

            return talk;
        });
        
        const talkSelected = talks?.filter((talk: Talk) => {
            if (talk.friendId === personId) return talk;
        })[0];

        selectedTalkDispatcher.setTalk(talkSelected as Talk);
        talkDispatcher.setTalk(talks as Talk[]);
        
        if (hasPending) signalR.connection.invoke('ViewMessage', talkSelected?.conversationId);
    }

    const checkOwnerLastMassege = (personId: number): boolean => {
        const talk = talkState.data?.filter((talk: Talk) => {
            if (talk.friendId === personId) return talk;
        })[0];

        const ehSent: boolean = talk ? talk?.messages[talk?.messages.length - 1].ehSent : false;

        return ehSent;
    }

    const checkAmountPendMessage = (personId: number): number => {
        const talk = talkState.data?.filter((talk: Talk) => {
            if (talk.friendId === personId) return talk;
        })[0];

        const pendings: number = !talk || !talk.messages ? 0 : talk?.messages.filter((msg: Message) => {
            if (msg.pending && !msg.ehSent) return msg;
        }).length;

        return pendings;
    }

    const handleToggleFriendImgModal = () => {
        setEhModalImgFriend(!ehModalImgFriend);
    }

    const handleToggleMyImgModal = () => {
        setEhModalMyImg(!ehModalMyImg);
    }

    const loading = () => (
        <styled.ContentLoad>
            <styled.LoadText>Carregando...</styled.LoadText>
            <Loader type="Oval" color="white" height={60}/>
        </styled.ContentLoad>
    );
    
    const mainContent = () => (
        <>
            <styled.Body>
                <styled.TalkSection>
                    <styled.FriendsMenu start={startAnimation}>
                        <FriendsContent toggleMenu={handleToggleMenuFriends} handleSetTalk={handleSetTalk} />
                    </styled.FriendsMenu>
                    <styled.BarSection>
                        <UserInfoBar toggleMenu={handleToggleMenuFriends} toggleImg={handleToggleMyImgModal} />
                    </styled.BarSection>
                    
                    {
                        people.map((person: ChatPerson) => (
                            <TalkContent key={person.id}  id={person.id as number} name={person.name as string} lastMessage={person.lastMessage}
                                avatar={person.avatar} handleSetTalk={handleSetTalk} checkOwner={checkOwnerLastMassege} checkPending={checkAmountPendMessage} />
                        ))
                    }

                </styled.TalkSection>
                <styled.MessageSection>
                    {
                        !selectedTalkState.data ? <styled.ContentNoTalk>Nenhuma conversa selecionada</styled.ContentNoTalk> : null
                    }
                    <styled.BarSection shadow={"1px 1px 5px rgb(150,150,150)"}>
                        {
                            selectedTalkState.data ?
                                <styled.ContentFriendBar>
                                    <commonStyled.ContentIcon>
                                        {
                                            friendSelected && friendSelected.avatar ?
                                            <commonStyled.HoverImg src={friendSelected.avatar} onClick={handleToggleFriendImgModal} />
                                            : <commonStyled.IconPerson icon={faUser}></commonStyled.IconPerson>
                                        }
                                    </commonStyled.ContentIcon>
                                    <styled.ContentFriendBarTexts>
                                        <>
                                            {
                                                friendSelected?.name
                                            }
                                        </>
                                        <div>
                                            <styled.ContentFriendBarOnline>
                                                {
                                                    friendSelected?.isOnline ? 'Online' : 'Offline'
                                                }
                                            </styled.ContentFriendBarOnline>
                                        </div>
                                    </styled.ContentFriendBarTexts>
                                </styled.ContentFriendBar>
                            : null
                        }
                    </styled.BarSection>
                    <styled.ContentMessage id="ContentMessage">
                        {
                            selectedTalkState.data?.messages.length === 0 ? '' 
                            :
                            selectedTalkState.data?.messages.map((message: Message, index: number) => (
                                <MessageContent key={index} sent={message.ehSent} text={message.text} />
                            ))
                        }
                        <br />
                    </styled.ContentMessage>
                    <styled.ContentSendBar>
                        <SendBar selectedTalk={selectedTalkState} />
                    </styled.ContentSendBar>
                </styled.MessageSection>
                {
                    ehModalImgFriend ? <styled.ContentViewImg onClick={handleToggleFriendImgModal}><styled.ViewImg src={friendSelected?.avatar} alt="" /></styled.ContentViewImg> : null
                }
                {
                    ehModalMyImg ? <styled.ContentViewImg onClick={handleToggleMyImgModal}><styled.ViewImg src={userState.data?.avatar} alt="" /></styled.ContentViewImg> : null
                }
            </styled.Body>
        </>
    );

    return (
        <styled.Main>
            {
                talkState.completed ? mainContent() : loading()
            }
        </styled.Main>
    );
}

export default Chat;