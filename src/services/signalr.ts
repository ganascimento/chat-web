import * as signalR from '@aspnet/signalr';
import { getToken } from './auth';

class SignalR {
    static connection = new signalR.HubConnectionBuilder().withUrl('http://www.gadev.com.br/chat_api/chat', { accessTokenFactory: () => getToken() as string}).build();

    static Start() {
        this.connection
            .start();
    }

    static Stop() {
        this.connection.stop();
    }
}

export default SignalR;