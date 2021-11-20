import { IUser } from "./iuser";
import { IClient } from "./iclient";

export interface ICard {
    id: number,
    n_tessera: string,
    created_at: Date,
    update_at: Date,
    user_id: number,
    user?: IUser,
    client_id: number,
    client?: IClient,
}
