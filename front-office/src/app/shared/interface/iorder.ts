import { IUser } from "./iuser";
import { IClient } from "./iclient";

export interface IOrder {
    id: number,
    n_ordine: number,
    p_ritiro: string,
    genere: string,
    t_vestiario: string,
    taglia: string,
    quantita: number,
    status: string,
    note: string,
    created_at: Date,
    update_at: Date,
    user_id: number,
    user?: IUser,
    client_id: number,
    client?: IClient,
}
