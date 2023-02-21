import React, { useState, useEffect } from 'react';
import { faUser, faLock, faEnvelope, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { UserDispatcher } from '../../../store/User/actions';
import * as styled from './styles';
import * as commonStyled from './../../../commonStyles/styles';

interface StateProps {
    handleFormRegister(): void;
    setLength(length: number): void;
    emailExists?: boolean;
}

const FormRegister = (props: StateProps) => {

    const [login, setLogin] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [loginError, setLoginError] = useState<boolean>(false);
    const [nameError, setNameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
    const dispatch: Dispatch = useDispatch();
    const userDispatcher = new UserDispatcher(dispatch);

    useEffect(() => {
        if (props.emailExists) props.setLength(446);
    }, [props.emailExists]);

    const changeLogin = (event: React.FormEvent<HTMLInputElement>) => {
        setLogin(event.currentTarget.value);
    }

    const changeName = (event: React.FormEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const changePassword = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const changeConfirmPassword = (event: React.FormEvent<HTMLInputElement>) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const handleRegister = (event: React.FormEvent) => {
        if (props.emailExists) userDispatcher.resetState();

        event.preventDefault();

        let valid: boolean = true;
        const expLogin: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const expPassword: RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z!@#$%^&*?]{8,12}$/;
        let amountErrors: number = 0;
        
        if (!login || login.length < 9 || !expLogin.test(login)){
            setLoginError(true);
            valid = false;
            amountErrors++;
        }
        else setLoginError(false);

        if (!name || name.length < 6) {
            setNameError(true);
            valid = false;
            amountErrors++;
        }
        else setNameError(false);

        if (!password || password.length < 8 || !expPassword.test(password)) {
            setPasswordError(true);
            valid = false;
            amountErrors++;
        }
        else setPasswordError(false);

        if (password !== confirmPassword) {
            setConfirmPasswordError(true);
            valid = false;
            amountErrors++;
        }
        else setConfirmPasswordError(false);

        if (!valid) {
            props.setLength(428 + (amountErrors * 18));
            return;
        }
        else props.setLength(428);

        userDispatcher.registerRequest({
            email: login,
            password: password,
            name: name,
            avatar: avatar.split(',')[1]
        });
    }

    const toBase64 = (file: any) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString());
        reader.onerror = error => reject(error);
    });

    const handleFileSelected = async (event: any) => {
        const imageBase64 = await toBase64(event.target.files[0]);
        setAvatar(imageBase64);
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <commonStyled.LoginHeader>
                    <commonStyled.Row />
                        <styled.ContentFileUpload htmlFor="upload-file">
                            {
                                avatar ? <commonStyled.Img src={avatar} alt="fnsfns"/> : <commonStyled.LoginTopIcon icon={faCamera} />
                            }                        
                        </styled.ContentFileUpload>
                    <commonStyled.Row />
                </commonStyled.LoginHeader>
                <styled.UploadFile type="file" id="upload-file" onChange={handleFileSelected} accept=".jpg,.jpeg,.png" multiple={false}  />
                <commonStyled.LoginContentInput>
                    <commonStyled.InputIconContent>
                        {
                            loginError ? <commonStyled.IconError icon={faEnvelope} /> : <commonStyled.Icon icon={faEnvelope} />
                        }
                    </commonStyled.InputIconContent>
                    <commonStyled.LoginInput placeholder={"EMAIL"} value={login} onChange={changeLogin} maxLength={80} />
                </commonStyled.LoginContentInput>
                {
                    loginError ? <commonStyled.ContentErrorMessage>E-mail inválido ou já cadastrado</commonStyled.ContentErrorMessage> : null
                }
                {
                    props.emailExists ? <commonStyled.ContentErrorMessage>E-mail já existe</commonStyled.ContentErrorMessage> : null
                }

                <commonStyled.LoginContentInput>
                    <commonStyled.InputIconContent>
                        {
                            nameError ? <commonStyled.IconError icon={faUser} /> : <commonStyled.Icon icon={faUser} />
                        }
                    </commonStyled.InputIconContent>
                    <commonStyled.LoginInput placeholder={"NOME"} value={name} onChange={changeName} maxLength={16} />
                </commonStyled.LoginContentInput>
                {
                    nameError ? <commonStyled.ContentErrorMessage>O nome deve conter entre 6 e 16 caracteres</commonStyled.ContentErrorMessage> : null
                }
                
                <commonStyled.LoginContentInput>
                    <commonStyled.InputIconContent>
                        {
                            passwordError ? <commonStyled.IconError icon={faLock} /> : <commonStyled.Icon icon={faLock} />
                        }
                    </commonStyled.InputIconContent>
                    <commonStyled.LoginInput placeholder={"SENHA"} type="password" value={password} onChange={changePassword} maxLength={12} />
                </commonStyled.LoginContentInput>
                {
                    passwordError ? <commonStyled.ContentErrorMessage>A senha deve conter letras e numeros e de 8 a 12 caracteres</commonStyled.ContentErrorMessage> : null
                }

                <commonStyled.LoginContentInput>
                    <commonStyled.InputIconContent>
                        {
                            confirmPasswordError ? <commonStyled.IconError icon={faLock} /> : <commonStyled.Icon icon={faLock} />
                        }
                    </commonStyled.InputIconContent>
                    <commonStyled.LoginInput placeholder={"CONFIRMAR SENHA"} type="password" value={confirmPassword} onChange={changeConfirmPassword} maxLength={12} />
                </commonStyled.LoginContentInput>
                {
                    confirmPasswordError ? <commonStyled.ContentErrorMessage>As senhas estão diferentes</commonStyled.ContentErrorMessage> : null
                }

                <commonStyled.LoginButton type="submit" value="CADASTRAR"/>
                <commonStyled.ActionButton onClick={props.handleFormRegister}>VOLTAR</commonStyled.ActionButton>
            </form>
        </div>
    );
}

export default FormRegister;