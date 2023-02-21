export interface Message {
    id: number;
    text: string;
    pending: boolean;
    sendDate: Date;
    ehSent: boolean;
}