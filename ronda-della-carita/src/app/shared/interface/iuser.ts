import { IParam } from "./iparam";

export interface IUser {
    id: number,
    nome: string,
    cognome: string,
    param_id: number,
    param?: IParam,
    email: string,
    email_verified_at: Date,
    admin_confirm: boolean,
    password: string,
    remember_token: string,
    created_at: Date,
    update_at: Date
}
