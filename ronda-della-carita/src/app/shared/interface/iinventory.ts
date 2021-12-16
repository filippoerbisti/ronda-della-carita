import { IParam } from "./iparam";

export interface IInventory {
    id: number,
    t_vestiario: string,
    taglia: string,
    created_at: Date,
    update_at: Date,
    param_id: number,
    param?: IParam
}
