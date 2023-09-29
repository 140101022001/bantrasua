export interface TraSuaType {
    id: number,
    img_url: string,
    name: string,
    price: number,
    quantity: number
}
export type CreateTraSua = Omit<TraSuaType, 'id'>