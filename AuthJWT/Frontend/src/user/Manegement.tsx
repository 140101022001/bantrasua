import { BACKEND_URL, changeTime, getStatus } from "../api/userApi"
import { useState, useEffect } from 'react';
import axios from "axios";
import { OrderType } from "../types/OrderType";
import ReactPaginate from 'react-paginate';

export enum status {
    DONE = 'DONE',
    CANCEL = 'CANCEL'
}
const Manegement = () => {
    const [data, setData] = useState<OrderType[]>([]);
    const itemsPerPage = 4;
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/order`)
            .then((res: { data: OrderType[] }) => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const changePage = (event: { selected: number}) => {
        setCurrentPage(event.selected);
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const handleChangeStatus = (id: number) => {
        axios.put(`${BACKEND_URL}/api/order/update`, { id, type: status.DONE })
            .then(() => {
                const newData = data.map(item =>
                    item.id === id ? { ...item, status: 1 } : item
                );
                setData(newData);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="container home-ct">
            <div className="ctn-header">
                <h1>Linh's Shop</h1>
            </div>
            <div style={{ width: '100%', marginTop: '20px' }}>
                <div style={{ float: 'right' }}>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            </div>
            {currentItems.length > 0 ? <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">タイトル</th>
                        <th scope="col">メールアドレス</th>
                        <th scope="col">イメージ</th>
                        <th scope="col">単価</th>
                        <th scope="col">数量</th>
                        <th scope="col">合計</th>
                        <th scope="col">注文時間</th>
                        <th scope="col">状態</th>
                        <th scope="col">アクション</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems?.map((item, index) => {
                        return (
                            <tr className="tr" key={item.id}>
                                <th scope="row">{(currentPage * itemsPerPage) + (index + 1)}</th>
                                <td>{item.title}</td>
                                <td>{item.email}</td>
                                <td><img className="product-img" src={item.img_url} alt={item.img_url} /></td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.sum}</td>
                                <td>{changeTime(item.created_at)}</td>
                                <td>{getStatus(item.status)}</td>
                                <td>{item.status === 0 ?
                                    <button className='btn btn-success' onClick={() => handleChangeStatus(item.id)}>準備完了</button>
                                    :
                                    ''
                                }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
                :
                <div>
                    <h3>現在の注文履歴がございません。</h3>
                </div>
            }
        </div>
    )
}

export default Manegement