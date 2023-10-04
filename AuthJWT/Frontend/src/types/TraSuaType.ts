export interface TraSuaType {
    id: number,
    img_url: string,
    name: string,
    price: number,
    quantity: number
    title?: string,
    email?: string,
    sum?: string,
    created_at?: string
    status?: number
}
export type CreateTraSua = Omit<TraSuaType, 'id'>