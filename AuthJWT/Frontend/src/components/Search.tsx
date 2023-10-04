import { useState, useEffect } from "react"
import { Icon } from '@iconify/react';
import { OrderType, SearchType } from "../types/OrderType";
import useAuth from "../hooks/useAuth";
import { TraSuaType } from "../types/TraSuaType";


type SearchProps = {
    type: SearchType,
    setOrder?: (data: OrderType[]) => void,
    setTraSua?: (data: TraSuaType[]) => void
}


export const Search = ({ type, setOrder, setTraSua}: SearchProps) => {
    const [input, setInput] = useState('');
    const [date, setDate] = useState<string>('');
    const [search, setSearch] = useState<boolean>(false);
    const { trasua, order } = useAuth();
    useEffect(() => {
        if (type == 'order') {
            if (setOrder) {
                setOrder(order);
            }
        } else {
            if (setTraSua) {
                setTraSua(trasua);
            }
        }
        if (date || input) {
            if (input && date) {
                if (order && order.length > 0 && setOrder) {
                    const Items = order.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
                    const newItems = Items.filter(item => compareDate(item.created_at));
                    setOrder(newItems);
                }
            } else if(input) {
                if (order && order.length > 0 && setOrder) {
                    const newItems = order.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
                    setOrder(newItems);
                }
                if (trasua && trasua.length > 0 && setTraSua) {
                    const newItems = trasua.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
                    setTraSua(newItems);
                }
            } else {
                if (order && order.length > 0 && setOrder) {
                    const newItems = order.filter(item => compareDate(item.created_at));
                    setOrder(newItems);
                }
            }
        }
    },[search, date])
    const compareDate = (item: string) => {
        const d = item.slice(0, -17);
        const compareDate = new Date(d);
        const inputDate = new Date(date);
        return compareDate.getTime() === inputDate.getTime()
    }
    
    if (type == SearchType.ORDER) {
        return (
            <div className="search-top">
                <input type="date" className="form-control" value={date} style={{ width: '150px'}} onChange={(e) => setDate(e.target.value)}/>
                <input type="text" name="search" value={input} className="form-control search-input" placeholder='検索テキスト...' onChange={(e) =>setInput(e.target.value)} onKeyPress={(e) =>{ if(e.key == 'Enter') { setSearch(!search)}} }/>
                <span title="検索" onClick={()=>setSearch(!search)}><Icon icon="material-symbols:search" width="23" height="23" /></span>
            </div>
        )
    } else {
        return (
            <div className="search-top">
                <input type="text" name="search" value={input} className="form-control search-input" placeholder='検索テキスト...' onChange={(e) =>setInput(e.target.value)} onKeyPress={(e) =>{ if(e.key == 'Enter') { setSearch(!search)}} }/>
                <span title="検索" onClick={()=>setSearch(!search)}><Icon icon="material-symbols:search" width="23" height="23" /></span>
            </div>
        )
    }
}
