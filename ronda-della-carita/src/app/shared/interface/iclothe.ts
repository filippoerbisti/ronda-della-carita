import { IOrder } from "./iorder";
import { IStatus } from "./iStatus";

export interface IClothe {
    id: number,
    t_vestiario: string,
    taglia: string,
    quantita: number,
    created_at: Date,
    update_at: Date,
    order_id: number,
    order?: IOrder,
    open:boolean,
    status: IStatus
}
