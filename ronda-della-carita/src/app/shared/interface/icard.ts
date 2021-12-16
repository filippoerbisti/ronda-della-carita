import { IClient } from "./iclient";

export interface ICard {
    id: number,
    n_tessera: string,
    created_at: Date,
    update_at: Date,
    client_id: number,
    client?: IClient,
}
