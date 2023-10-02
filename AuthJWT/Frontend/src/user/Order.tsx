import { useEffect, useState } from 'react';
import axios from "axios";
import { BACKEND_URL } from '../api/userApi';
import { TraSuaType } from '../types/TraSuaType';
import OrderModal from '../components/modal/OrderModal';

const Order = () => {
    const [data, setData] = useState<TraSuaType[]>([]);
    const [success, setSuccess] = useState<string>('');
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/product`).then(res => setData(res.data)).catch(err => console.log(err));
    }, [])
    return (
        <div className="container home-ct">
            <div className="ctn-header">
                <h1>Linh's Shop</h1>
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
                        <th scope="col">アクション</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return (
                            <tr className="tr" key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td><img className="product-img" src={item.img_url} alt={item.img_url} /></td>
                                <td>{item.name}</td>
                                <td>{item.price}￥</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity > 0 ? '在庫あり' : '在庫なし'}</td>
                                <td>{item.quantity > 0 ?
                                    <span><OrderModal data={data} setData={setData} setSuccess={setSuccess} item={item}/></span>
                                    :
                                    <span>現在購入できません。</span>
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