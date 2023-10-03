import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { BACKEND_URL } from '../../api/userApi';
import { useDispatch } from 'react-redux';
import { userChangeInfo } from '../../redux/slice/authSlice';
import { productResponse } from './ChargeModal';

const DepositModal = ({setSuccess}: {setSuccess: (error: string) => void;}) => {
    const [err, setErr] = useState<string>('');
    const dispatch = useDispatch();
    const { money, user } = useAuth();
    const [deposit, setDeposit] = useState<number>(0);
    const hanldeDeposit = () => {
        if (deposit && deposit > 99) {
            setErr('');
            setDeposit(0);
            axios.put(`${BACKEND_URL}/api/deposit/${user.id ?? ""}`,{deposit})
            .then((res:productResponse) => {
                const updatedUser = {...user, money: res.data.money};
                dispatch(userChangeInfo(updatedUser));
                setSuccess('チャージしました。');
                const closeBtn = document.getElementById('close-btn-deposit');
                closeBtn?.click();
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            setErr('チャージ最低金額は100円です。')
        }
    }
    return (
        <>
            <button data-bs-toggle="modal" data-bs-target='#depositModal' style={{ outline: 'none', border: 'none' }} title='チャージ' className='icon-btn btn btn-warning'>
                <span style={{ color: 'white' }}>チャージする</span>
            </button>
            <div className="modal fade" id='depositModal' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">残高をチャージする</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {err && <li className='alert alert-danger'>{err}</li>}
                                <div className="mb-3 list-div">
                                    <div>
                                        <span>残高: {money}￥</span>
                                    </div>
                                    <div>
                                        <span>チャージ後: {Number(money) + deposit}￥</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="deposit" className="form-label">金額:</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                                        <input type="number" name='quantity' value={deposit === 0 ? "": deposit} className="form-control input" id='deposit' onChange={(e) => setDeposit(Number(e.target.value))} />
                                        <span>￥</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="close-btn-deposit">閉じる</button>
                            <button type="button" className="btn btn-primary" onClick={hanldeDeposit}>チャージ</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DepositModal