import { IUser } from "./iuser";
import { IClient } from "./iclient";
import { IClothe } from "./iclothe";

export interface IOrder {
    id: number,
    n_ordine: number,
    p_ritiro: string,
    quantita: number,
    note: string,
    created_at: Date,
    update_at: Date,
    user_id: number,
    user?: IUser,
    client_id: number,
    client?: IClient,
    clothes: IClothe[],
    n_clothes: number,
    status: string
}
