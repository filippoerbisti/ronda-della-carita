import { IUser } from "./IUser";
import { IClient } from "./IClient";
import { IClothe } from "./IClothe";
import { IStatus } from "./IStatus";

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
