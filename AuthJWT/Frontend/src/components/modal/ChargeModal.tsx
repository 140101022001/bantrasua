import { Icon } from '@iconify/react';
import { useState } from 'react';
import { BACKEND_URL } from '../../api/userApi';
import axios from 'axios';
import { TraSuaType } from '../../types/TraSuaType';
export type productResponse = {
    data: {
        product: TraSuaType,
        money?:string
    };
}
const ChargerModal = ({ data, id, sum, setData, setSuccess }: { data: TraSuaType[], id: number, sum: number, setData: (data: TraSuaType[]) => void, setSuccess: (mes: string)=>void }) => {
    const [quantity, setQuantity] = useState(0);
    const [err, setErr] = useState('');
    const count = sum;
    const handleCharge = () => {
        if (quantity > 0) {
            const body = {
                id,
                quantity: count + quantity
            }
            axios.put(`${BACKEND_URL}/api/product/charge`, body)
                .then((res: productResponse) => {
                    const updatedArray = data.map(item =>
                        item.id === res.data.product.id ? res.data.product : item
                    );
                    setQuantity(0);
                    setData(updatedArray);
                    setSuccess('チャージしました。');
                    setErr('');
                    const closeButton = document.getElementById(`close-btn-charge${id}`);
                    closeButton?.click();
                }).catch(error =>
                    console.log(error)
                );
        } else {
            setErr('数量を入力してください。');
        }

    }
    return (
        <>
            <span data-bs-toggle="modal" data-bs-target={`#chargeModal${id}`} style={{ outline: 'none', border: 'none' }} title='charge' className='icon-btn'>
                <Icon icon="ei:plus" width="24" height="24" />
            </span>
            <div className="modal fade" id={`chargeModal${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">商品を入庫する</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {err && <li className='alert alert-danger'>{err}</li>}
                                <div className="mb-3 list-div">
                                    <div>
                                        <span>現在数量: {count}個</span>
                                    </div>
                                    <div>
                                        <span>チャージ後数量: {count + quantity}個</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`product-name${id}`} className="form-label">数量:</label>
                                    <input type="number" name='quantity' value={quantity === 0 ? "": quantity} className="form-control input" id={`product-name${id}`} onChange={(e) => setQuantity(Number(e.target.value))} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id={`close-btn-charge${id}`}>閉じる</button>
                            <button type="button" className="btn btn-primary" onClick={handleCharge}>チャージ</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChargerModal