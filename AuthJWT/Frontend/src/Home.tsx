import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from 'react';
import axios from "axios";
import { BACKEND_URL } from "./api/userApi";
import { TraSuaType } from "./types/TraSuaType";
import CreateModal from "./components/modal/CreateModal";
import EditModal from "./components/modal/EditModal";

const Home = () => {
    const { user } = useAuth();
    const [data, setData] = useState<TraSuaType[]>([]);
    const [success, setSuccess] = useState<string>('');
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/product`).then(res => setData(res.data)).catch(err => console.log(err));
    }, [])
    if (user.role_id == 2 || !user.role_id) {
        return <Navigate to='/access-denied' />
    }
    return (
        <div className="container home-ct">
            <div className="ctn-header">
                <h1>Linh's Shop</h1>
                <CreateModal setData={setData} setSuccess={setSuccess}/>
            </div>
            {success && <li className='alert alert-success'>{success}</li>}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">イメージ</th>
                        <th scope="col">名前</th>
                        <th scope="col">価格</th>
                        <th scope="col">数量</th>
                        <th scope="col">状態</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return (
                            <tr className="tr" key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td><img className="product-img" src={item.img_url} alt={item.img_url} /></td>
                                <td>{item.name}</td>
                                <td>{item.price}￥</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity > 0 ? '在庫あり':'在庫なし'}</td>
                                <td><EditModal data={data} index={index}/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home