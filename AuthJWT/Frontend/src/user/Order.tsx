import { useEffect, useState } from 'react';
import axios from "axios";
import { BACKEND_URL } from '../api/userApi';
import { TraSuaType } from '../types/TraSuaType';
import OrderModal from '../components/modal/OrderModal';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ReactPaginate from 'react-paginate';
import usePaginate from '../hooks/usePaginate';
import { Search } from '../components/Search';
import { SearchType } from '../types/OrderType';
import { useDispatch } from 'react-redux';
import { trasuaState } from '../redux/slice/trasuaSlice';

const Order = () => {
    const { role_id } = useAuth();
    const [data, setData] = useState<TraSuaType[]>([]);
    const {changePage, currentItems, currentPage, pageCount, itemsPerPage} = usePaginate(data);
    const [success, setSuccess] = useState<string>('');
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/product`).then((res: { data: TraSuaType[] }) => {
            setData(res.data)
            dispatch(trasuaState(res.data));
        }).catch(err => console.log(err));
    }, [])
    return (
        <div className="container home-ct">
            <div className="ctn-header">
                <h1>Linh's Shop</h1>
                {role_id == 2 && <Link to='/history' className="btn btn-info" style={{ display: 'flex', color: 'white', alignItems: 'center' }}><span>注文履歴を見る</span></Link>}
            </div>
            <div style={{ width: '100%', marginTop: '20px' }}>
                <Search type={SearchType.TRASUA} setTraSua={setData} />
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
            {success && <li className='alert alert-success' style={{ marginTop: '60px' }}>{success}</li>}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">イメージ</th>
                        <th scope="col">名前</th>
                        <th scope="col">価格</th>
                        <th scope="col">数量</th>
                        <th scope="col">状態</th>
                        <th scope="col">アクション</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems?.map((item, index) => {
                        return (
                            <tr className="tr" key={item.id}>
                                <th scope="row">{(currentPage * itemsPerPage) + (index + 1)}</th>
                                <td><img className="product-img" src={item.img_url} alt={item.img_url} /></td>
                                <td>{item.name}</td>
                                <td>{item.price}￥</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity > 0 ? '在庫あり' : '在庫なし'}</td>
                                <td>{item.quantity > 0 ?
                                    <span><OrderModal data={data} setData={setData} setSuccess={setSuccess} item={item} /></span>
                                    :
                                    <span>現在注文できません。</span>
                                }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Order