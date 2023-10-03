import { Icon } from '@iconify/react';
import { useState } from 'react';
import { BACKEND_URL } from '../../api/userApi';
import axios from 'axios';
import { TraSuaType } from '../../types/TraSuaType';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { userChangeInfo } from '../../redux/slice/authSlice';
import { productResponse } from './ChargeModal';

const OrderModal = ({ data, item, setData, setSuccess }: { data: TraSuaType[], item: TraSuaType, setData: (data: TraSuaType[]) => void, setSuccess: (mes: string)=>void }) => {
    const { id, quantity: sum, price, name, img_url } = item;
    const [quantity, setQuantity] = useState(0);
    const { money, user } = useAuth();
    const [err, setErr] = useState('');
    const dispatch = useDispatch();
    const count = sum;
    const handleOrder = () => {
        if (quantity > 0) {
            if (quantity > sum) {
                setErr('在庫が足りません。')
            } else {
                if (Number(quantity * price) > Number(money)) {
                    setErr('残高が足りません。')
                } else {
                    const body = {
                        title: `${user.name ?? ""}さんが${name}を注文しました。`,
                        user_id: user.id,
                        product_id: id,
                        quantity: quantity,
                        sum: quantity * price
                    }
                    axios.post(`${BACKEND_URL}/api/order/create`, body)
                        .then((res: productResponse) => {
                            const updatedArray = data.map(item =>
                                item.id === res.data.product.id ? res.data.product : item
                            );
                            setQuantity(0);
                            setData(updatedArray);
                            const updatedUser = { ...user, money: res.data.money }
                            dispatch(userChangeInfo(updatedUser));
                            setSuccess(`${name}を注文しました。`);
                            setErr('');
                            const closeButton = document.getElementById(`close-btn-order${id}`);
                            closeButton?.click();
                        }).catch(error =>
                            console.log(error)
                        );
                }
            }
        } else {
            setErr('数量を入力してください。');
        }

    }
    return (
        <>
            <span data-bs-toggle="modal" data-bs-target={`#orderModal${id}`} style={{ outline: 'none', border: 'none' }} title='注文' className='icon-btn'>
                <Icon icon="icon-park-outline:shopping" width="24" height="24" />
            </span>
            <div className="modal fade" id={`orderModal${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">商品を注文する</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {err && <li className='alert alert-danger'>{err}</li>}
                                <div className="mb-3" style={{ display: 'flex', width: '100%' }}>
                                    <div className='list-div'>
                                        <div>
                                            <span>残高: {money}￥</span>
                                        </div>
                                        <div>
                                            <span>商品名: {name}</span>
                                        </div>
                                        <div>
                                            <span>単価: {price}￥</span>
                                        </div>
                                        <div>
                                            <span>在庫: {count}個</span>
                                        </div>
                                        <div>
                                            <span>合計: {quantity * price}￥</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div><span>イメージ：</span></div>
                                        <img src={img_url} alt={img_url} width={200} height={200} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`oder${id}`} className="form-label">数量:</label>
                                    <input type="number" name='quantity' value={quantity === 0 ? "": quantity} className="form-control input" id={`oder${id}`} onChange={(e) => setQuantity(Number(e.target.value))} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id={`close-btn-order${id}`}>閉じる</button>
                            <button type="button" className="btn btn-primary" onClick={handleOrder}>注文</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderModal