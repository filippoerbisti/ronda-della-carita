import { IUser } from "./iuser";

export interface IHistory {
    id: number,
    ultimo_accesso: Date,
    interno: boolean,
    user_id: number,
    user?: IUser
}
