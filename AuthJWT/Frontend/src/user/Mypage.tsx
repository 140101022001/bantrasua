import { useState } from "react";
import DepositModal from "../components/modal/DepositModal";
import useAuth from "../hooks/useAuth"
import { Navigate, Link } from 'react-router-dom'

const Mypage = () => {
    const { jwt, email, name, money, role_id } = useAuth();
    const [success, setSuccess] = useState<string>('');
    if (!jwt) {
        return <Navigate to='/login' />
    }
    return (
        <div className="container">
            <h1>マイページ</h1>
            {success && <li className='alert alert-success'>{success}</li>}
            <div style={{ display: 'flex', gap: '50px' }}>
                <div style={{ width: '50%' }}>
                    <div className="mypage-main">
                        <h3>プロフィール</h3>
                        <strong>名前： {name}</strong>
                        <strong>メールアドレス： {email}</strong>
                        <strong>残高： {money}￥</strong>
                    </div>
                </div>
                <div>
                    <div className="mypage-main">
                        <h3>アクション</h3>
                        {role_id == 2 ? 
                        <>
                            <Link to='/history' className="btn btn-info" style={{color: 'white'}}>注文履歴</Link>
                            <DepositModal setSuccess={setSuccess}/>
                        </>
                        :
                        <>
                            <Link to='/manegement' className="btn btn-info" style={{color: 'white'}}>注文管理</Link>
                            <Link to='/benefit' className="btn btn-warning" style={{color: 'white'}}>売上管理</Link>
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mypage