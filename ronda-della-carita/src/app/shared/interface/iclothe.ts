import { IInventory } from "./iinventory";
import { IOrder } from "./iorder";
import { IParam } from "./iparam";

export interface IClothe {
    id: number,
    quantita: number,
    created_at: Date,
    update_at: Date,
    order_id: number,
    order?: IOrder,
    inventory_id: number,
    inventory?: IInventory,
    param_id: number,
    param?: IParam
}
