import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL, changeTime, getStatus } from '../api/userApi';
import { OrderType, SearchType } from '../types/OrderType';
import useAuth from '../hooks/useAuth';
import { status } from './Manegement';
import { useDispatch } from 'react-redux';
import { userChangeInfo } from '../redux/slice/authSlice';
import ReactPaginate from 'react-paginate';
import usePaginate from '../hooks/usePaginate';
import { Search } from '../components/Search';
import { orderState } from '../redux/slice/trasuaSlice';

const History = () => {
    const [data, setData] = useState<OrderType[]>([]);
    const [success, setSuccess] = useState<string>('');
    const { changePage, currentItems, currentPage, pageCount, itemsPerPage } = usePaginate(data);
    const { user } = useAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/order/${String(user.id)}`)
            .then((res: { data: OrderType[] }) => {
                setData(res.data);
                dispatch(orderState(res.data))
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const handleChangeStatus = (id: number, sum: string, quantity: number, name: string) => {
        if (window.confirm('この注文をキャンセルします。支払った金額の半額が差し引かれます。よろしでしょか？')) {
            axios.put(`${BACKEND_URL}/api/order/update`, { id, type: status.CANCEL, user_id: user.id, sum, quantity, name })
                .then((res) => {
                    console.log(res);
                    
                    const newData = data.map(item =>
                        item.id === id ? { ...item, status: 2 } : item
                    );
                    const newMoney = { ...user, money: Number(user.money) + (Number(sum) / 2) }
                    dispatch(userChangeInfo(newMoney));
                    setData(newData);
                    setSuccess('キャンセルしました。')
                }).catch(err => {
                    console.log(err);
                })
        }
    }
    
    return (
        <div className="container">
            <div>
                <div className="ctn-header">
                    <h1>Linh's Shop</h1>
                </div>
                <div style={{ width: '100%' }}>
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
            </div>
            {success && <li className='alert alert-success' style={{ marginTop: '60px' }}>{success}</li>}
            <div>
                {data.length > 0 ? <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">商品名</th>
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
                                    <td>{item.name}</td>
                                    <td><img className="product-img" src={item.img_url} alt={item.img_url} /></td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.sum}</td>
                                    <td>{changeTime(String(item.created_at))}</td>
                                    <td>{getStatus(Number(item.status))}</td>
                                    <td>
                                        {
                                            item.status === 0 ? <button className='btn btn-danger' onClick={() => handleChangeStatus(item.id, String(item.sum), item.quantity, item.name)}>キャンセル</button>
                                                :
                                                ''
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                    :
                    <div style={{ marginTop: '200px'}}>
                        <h3>現在の注文履歴がございません。</h3>
                    </div>
                }
            </div>

        </div>
    )
}

export default History