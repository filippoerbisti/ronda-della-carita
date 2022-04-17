export interface IUser {
    id: number,
    nome: string,
    cognome: string,
    ruolo: string,
    n_tessera: number,
    email: string,
    password: string,
    remember_token: string,
    created_at: Date,
    update_at: Date
}
