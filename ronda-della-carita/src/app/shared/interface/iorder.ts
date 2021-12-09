import { IUser } from "./iuser";
import { IClient } from "./iclient";
import { IParam } from "./iparam";
import { IClothe } from "./iclothe";

export interface IOrder {
    id: number,
    n_ordine: number,
    p_ritiro: string,
    clothe_id: number,
    clothe?: IClothe,
    quantita: number,
    param_id: number,
    param?: IParam,
    note: string,
    created_at: Date,
    update_at: Date,
    user_id: number,
    user?: IUser,
    client_id: number,
    client?: IClient,
}
