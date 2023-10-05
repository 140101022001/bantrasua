import { BACKEND_URL, getStatus } from "../api/userApi"
import { useState, useEffect } from 'react';
import axios from "axios";
import { OrderType, SearchType } from "../types/OrderType";
import ReactPaginate from 'react-paginate';
import usePaginate from "../hooks/usePaginate";
import { Search } from "../components/Search";
import { useDispatch } from "react-redux";
import { orderState } from "../redux/slice/trasuaSlice";
import { Link } from "react-router-dom";

export enum status {
    DONE = 'DONE',
    CANCEL = 'CANCEL'
}
const Manegement = () => {
    const [data, setData] = useState<OrderType[]>([]);
    const [type, setType] = useState<string>('today');
    const { changePage, currentItems, currentPage, pageCount, itemsPerPage } = usePaginate(data);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/order/management/${type}`)
            .then((res: { data: OrderType[] }) => {
                setData(res.data);
                dispatch(orderState(res.data))
            })
            .catch(err => {
                console.log(err);
            })
    }, [type]);
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
                <Link to='/benefit' className="btn btn-warning" style={{color: 'white'}}>売上管理</Link>
            </div>
            <div style={{ width: '100%', marginTop: '20px' }}>
                <Search type={SearchType.ORDER} setOrder={setData} />
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
            <div style={{ display: 'flex', marginTop: '80px', gap: '20px'}}>
                <button className="btn btn-info" onClick={() => setType('today')}><span>今日</span></button>
                <button className="btn btn-info" onClick={() => setType('all')}><span>全て</span></button>
            </div>
            <div style={{ marginTop: '20px'}}>
                {type == 'today' ? <h3>今日の販売履歴</h3>: <h3>全ての販売履歴</h3>}
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
                                <td>{item.created_at}</td>
                                <td>{getStatus(Number(item.status))}</td>
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