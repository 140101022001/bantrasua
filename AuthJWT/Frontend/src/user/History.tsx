import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../api/userApi';
import { OrderType } from '../types/OrderType';
import useAuth from '../hooks/useAuth';
const History = () => {
    const [data, setData] = useState<OrderType[]>([]);
    const { user } = useAuth();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/order/${String(user.id)}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const changeTime = (item: string) => {
        const datetime = new Date(item);
        const year = datetime.getFullYear();
        const month = datetime.getMonth() + 1; 
        const day = datetime.getDate(); 

        const hours = datetime.getUTCHours(); 
        const minutes = datetime.getUTCMinutes();
        const time = `${year}/${month}/${day}` + ` ${hours}:${minutes > 9 ? minutes: `${0}${minutes}`}`;
        return time;
    }
    const getStatus = (status: number) => {
        if (status === 0) {
            return '準備中'
        } else if (status == 1) {
            return '完了'
        }
    }
    return (
        <div className="container home-ct">
            <div className="ctn-header">
                <h1>Linh's Shop</h1>
            </div>
            {data.length > 0 ? <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">タイトル</th>
                        <th scope="col">メールアドレス</th>
                        <th scope="col">イメージ</th>
                        <th scope="col">数量</th>
                        <th scope="col">合計</th>
                        <th scope="col">購入時間</th>
                        <th scope="col">状態</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return (
                            <tr className="tr" key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.email}</td>
                                <td><img className="product-img" src={item.img_url} alt={item.img_url} /></td>
                                <td>{item.quantity}</td>
                                <td>{item.sum}</td>
                                <td>{changeTime(item.created_at)}</td>
                                <td>{getStatus(item.status)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            :
            <div>
                <h3>現在の購入履歴がございません。</h3>
            </div>
            }
        </div>
    )
}

export default History