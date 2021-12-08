import { IDocument } from "./idocument";
import { IParam } from "./iparam";
import { IUser } from "./iuser";

export interface IClient {
    id: number,
    nome: string,
    cognome: string,
    param_id: number,
    param?: IParam,
    document_id: number,
    document?: IDocument,
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
