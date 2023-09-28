import { useEffect, useState } from 'react';
import axios from "axios";
import { BACKEND_URL } from '../api/userApi';

const Order = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/product`).then(res => setData(res.data)).catch(err => console.log(err));
    }, [])
    return (
        <div className="container home-ct">
            <h1>Linh's Shop</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">イメージ</th>
                        <th scope="col">名前</th>
                        <th scope="col">価格</th>
                        <th scope="col">在庫</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => {
                        return (
                            <tr className="tr" key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td><img className="product-img" src={item.img_url} alt={item.img_url} /></td>
                                <td>{item.name}</td>
                                <td>{item.price}￥</td>
                                <td>{item.quantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Order