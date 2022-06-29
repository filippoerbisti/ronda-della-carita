import { IOrder } from "./IOrder";
import { IStatus } from "./IStatus";

export interface IClothe {
    id: number,
    t_vestiario: string,
    reference: string,
    taglia: any,
    quantita: number,
    created_at: Date,
    update_at: Date,
    order_id: number,
    order?: IOrder,
    open: boolean,
    status: IStatus
}
