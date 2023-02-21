import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { ApplicationState } from './../../store/rootReducer';
import { UserState } from './../../store/User/types';
import { TalkState } from './../../store/Talk/types';
import { isAuthenticated } from './../../services/auth';
import FormLogin from './FormLogin/index';
import FormRegister from './FormRegister/index';
import * as styled from './styles';

const Login = () => {

    const [registerContent, setRegisterContent] = useState<boolean>(false);
    const [lengthBodyRegister, setLengthBodyRegister] = useState<number>(428);
    const userState: UserState = useSelector<ApplicationState, UserState>((state: ApplicationState) => state.user);
    const talkState: TalkState = useSelector<ApplicationState, TalkState>((state: ApplicationState) => state.talk);

    const handleFormRegister = () => {
        setRegisterContent(!registerContent);
        setLengthBodyRegister(428);
    }

    const formLogin = () => (
        <>
            <styled.Body>
                <FormLogin handleFormRegister={handleFormRegister} hasError={userState.fail} />
            </styled.Body>
            <styled.Footer>
                &copy; GADev - GAChat - 2020
            </styled.Footer>
        </>
    );

    const formRegister = () => (
         <>
            <styled.Body size={lengthBodyRegister}>
                <FormRegister handleFormRegister={handleFormRegister} setLength={setLengthBodyRegister} emailExists={userState.registerError} />
            </styled.Body>
            <styled.Footer >
                &copy; GADev - GAChat - 2020
            </styled.Footer>
        </>
    );

    const loading = () => (
        <>
            <styled.LoadText>Carregando...</styled.LoadText>
            <Loader type="Oval" color="white" height={60}/>
        </>
    );

    return (
        <styled.Main>
            {
                userState.authenticated && isAuthenticated() && talkState.completed ? <Redirect to="/talk" /> : null
            }
            {
                userState.loading || talkState.loading ? loading() : (registerContent ? formRegister() : formLogin())
            }
            
        </styled.Main>
    );
}

export default Login;