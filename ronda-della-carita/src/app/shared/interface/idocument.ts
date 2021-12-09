import { IParam } from "./iparam";

export interface IDocument {
    id: number,
    n_documento: string,
    created_at: Date,
    update_at: Date,
    param_id: number,
    param?: IParam
}
