import { useState, useEffect } from 'react';
import { TraSuaType } from '../types/TraSuaType';
import { OrderType } from '../types/OrderType';

const usePaginate = (data: TraSuaType[]) => {
    const itemsPerPage = 4;
    const [currentItems, setCurrentItems] = useState<TraSuaType[] | OrderType[]>(data);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const changePage = (event: { selected: number}) => {
        setCurrentPage(event.selected);
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        const item = data.slice(itemOffset, endOffset);
        setCurrentItems(item);
    },[data, itemOffset])

    const pageCount = Math.ceil(data.length / itemsPerPage);
    return {currentItems, currentPage, changePage, pageCount, itemsPerPage, setCurrentItems}
}

export default usePaginate