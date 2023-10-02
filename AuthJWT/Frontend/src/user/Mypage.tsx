import useAuth from "../hooks/useAuth"
import { Navigate, Link } from 'react-router-dom'

const Mypage = () => {
    const { jwt, email, name, money, role_id } = useAuth();
    if (!jwt) {
        return <Navigate to='/login' />
    }
    return (
        <div className="container">
            <h1>マイページ</h1>
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
                        {role_id == 2 && <Link to='/history' className="btn btn-info" style={{color: 'white'}}>購入履歴</Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mypage