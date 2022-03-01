import { IOrder } from "./iorder";

export interface IClothe {
    id: number,
    t_vestiario: string,
    taglia: string,
    quantita: number,
    status: string,
    created_at: Date,
    update_at: Date,
    order_id: number,
    order?: IOrder,
    open:boolean
}
