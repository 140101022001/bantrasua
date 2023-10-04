export interface OrderType {
    id: number,
    title: string,
    email: string,
    name: string,
    img_url: string,
    price: number,
    quantity: number,
    sum: string,
    created_at: string
    status: number
}
export enum SearchType {
    ORDER = 'order',
    TRASUA = 'trasua'
}
