import { IUser } from "./iuser";

export interface IClient {
    id: number,
    nome: string,
    cognome: string,
    genere: string,
    n_documento: string,
    t_documento: string,
    nazionalita: string,
    t_maglietta: string,
    t_pantaloni: string,
    t_scarpe: number,
    note: string,
    created_at: Date,
    update_at: Date,
    user_id: number,
    user?: IUser,
}
