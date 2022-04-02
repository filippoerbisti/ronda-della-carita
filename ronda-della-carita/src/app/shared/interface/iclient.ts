import { IDocument } from "./IDocument";
import { IUser } from "./IUser";

export interface IClient {
    id: number,
    nome: string,
    cognome: string,
    n_tessera: number,
    genere: string,
    altezza: number,
    document_id: number,
    document?: IDocument,
    nazionalita: string,
    t_maglietta: string,
    t_pantaloni: string,
    t_scarpe: number,
    note: string,
    // created_at: Date,
    // update_at: Date,
    user_id: number,
    user?: IUser,
}
