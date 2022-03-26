import { IUser } from "./iuser";
import { IClient } from "./iclient";
import { IClothe } from "./iclothe";
import { IStatus } from "./iStatus";

export interface IOrder {
    id: number,
    n_ordine: number,
    p_ritiro: string,
    livello: number,
    note: string,
    clothes_count: number,
    created_at: Date,
    update_at: Date,
    user_id: number,
    user?: IUser,
    client_id: number,
    client?: IClient,
    clothes: IClothe[],
    n_clothes: number,
    status: IStatus
}
