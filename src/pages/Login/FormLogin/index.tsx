import React, { useState, useEffect } from 'react';
import 'pretty-checkbox';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { UserDispatcher } from '../../../store/User/actions';
import { Auth, getAuth, setAuth, removeAuth } from './../../../services/auth';
import * as styled from './styles';
import * as commonStyled from './../../../commonStyles/styles';

export interface StatePtrops {
    handleFormRegister(): void;
    hasError: boolean;
}

const FormLogin = (props: StatePtrops) => {

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [check, setCheck] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        const auth: Auth | null = getAuth();

        if (auth) {
            setLogin(auth.login);
            setPassword(auth.password);
        }
    }, []);

    const changeLogin = (event: React.FormEvent<HTMLInputElement>) => {
        setLogin(event.currentTarget.value);
    }

    const changePassword = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        let valid: boolean = true;
        const expLogin: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const expPassword: RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z!@#$%^&*?]{8,12}$/;
        
        if (!login || login.length < 9 || !expLogin.test(login)){
            setLoginError(true);
            valid = false;
        }
        else setLoginError(false);

        if (!password || password.length < 8 || !expPassword.test(password)) {
            setPasswordError(true);
            valid = false;
        }
        else setPasswordError(false);

        if (!valid) {
            return;
        }

        if (check) {
            const auth: Auth = { login, password };
            setAuth(auth);
        }
        else removeAuth();

        const userDispatcher = new UserDispatcher(dispatch);

        userDispatcher.loginRequest({
            email: login,
            password: password
        });
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <commonStyled.LoginHeader>
                    <commonStyled.Row />
                        <styled.ContentIcon>
                            <commonStyled.LoginTopIcon icon={faUser} />                        
                        </styled.ContentIcon>
                    <commonStyled.Row />
                </commonStyled.LoginHeader>
                <commonStyled.LoginContentInput>
                    <commonStyled.InputIconContent>
                        {
                            loginError ? <commonStyled.IconError icon={faEnvelope} /> : <commonStyled.Icon icon={faEnvelope} />
                        }
                    </commonStyled.InputIconContent>
                    <commonStyled.LoginInput placeholder={"EMAIL"} value={login} onChange={changeLogin} maxLength={80} />
                </commonStyled.LoginContentInput>
                <commonStyled.LoginContentInput>
                    <commonStyled.InputIconContent>
                        {
                            passwordError ? <commonStyled.IconError icon={faLock} /> : <commonStyled.Icon icon={faLock} />
                        }
                    </commonStyled.InputIconContent>
                    <commonStyled.LoginInput placeholder={"SENHA"} type="password" value={password} onChange={changePassword} maxLength={12} />
                </commonStyled.LoginContentInput>
                {
                    props.hasError ? <commonStyled.ContentErrorMessage>Usuário ou senha inválidos</commonStyled.ContentErrorMessage> : null
                }
                <commonStyled.LoginButton type="submit" value="LOGIN"/>
                <commonStyled.ActionButton onClick={props.handleFormRegister}>REGISTRAR</commonStyled.ActionButton>
                <styled.Check state={check} onChange={() => { setCheck(!check); }}>Lembrar-me</styled.Check>
            </form>
        </div>
    );
}

export default FormLogin;