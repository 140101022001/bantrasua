import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from 'react';
import axios from "axios";
import { BACKEND_URL } from "./api/userApi";
import { TraSuaType } from "./types/TraSuaType";
import CreateModal from "./components/modal/CreateModal";
import EditModal from "./components/modal/EditModal";
import { Icon } from '@iconify/react';
import ChargeModal from "./components/modal/ChargeModal";
import ReactPaginate from 'react-paginate';
import usePaginate from "./hooks/usePaginate";
import { Search } from "./components/Search";
import { SearchType } from "./types/OrderType";
import { useDispatch } from "react-redux";
import { trasuaState } from "./redux/slice/trasuaSlice";

type response = {
    data: TraSuaType[]
}
const Home = () => {
    const { user } = useAuth();
    const [data, setData] = useState<TraSuaType[]>([]);
    const [success, setSuccess] = useState<string>('');
    const {changePage, currentItems, currentPage, pageCount, itemsPerPage} = usePaginate(data);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/product`).then((res: response)  => { 
            setData(res.data)
            dispatch(trasuaState(res.data));
        }).catch(err => console.log(err));
    }, [])
    const handleDelete =(id: number, name: string) => {
        if (window.confirm(`${name}を削除します。よろしでしょか？`)) {
            axios.delete(`${BACKEND_URL}/api/product/delete`, { data: { id: id } })
            .then(res => {
                console.log(res);
                const updatedArray = data.filter(item => item.id !== id);
                setData(updatedArray);
                setSuccess('商品を削除しました。');
            }).catch(err => {
                console.log(err);
            })
        }
    }
    if (user.role_id == 2 || !user.role_id) {
        return <Navigate to='/access-denied' />
    }
    return (
        <div className="container home-ct">
            <div className="ctn-header">
                <h1>Linh's Shop</h1>
                <CreateModal setData={setData} setSuccess={setSuccess} />
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
                                <td>
                                    <span><EditModal data={data} index={index} setData={setData} setSuccess={setSuccess} /></span>
                                    <span style={{ marginLeft: '20px' }} title='delete' className='icon-btn' onClick={() => handleDelete(item.id, item.name)}><Icon icon="jam:trash" width="24" height="24" /></span>
                                    <span style={{ marginLeft: '20px' }} className='icon-btn'><ChargeModal data={data} sum={item.quantity} id={item.id} setData={setData} setSuccess={setSuccess}/></span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home