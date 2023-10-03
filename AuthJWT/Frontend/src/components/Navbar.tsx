import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/react.svg'
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { userLogoutSuccess } from '../redux/slice/authSlice';

const Navbar = () => {
    const { jwt, money } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const handleLogout = () => {
        dispatch(userLogoutSuccess());
        navigate('/login');
    }
    const orderPage = () => {
        if(!jwt) {
            navigate('/login', { state: {message: 'ログインしてください。'}})
        } else {
            navigate('/order')
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={logo} alt="logo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-2" style={{width: '100%'}}>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Admin</Link>
                            </li>
                            <li className="nav-item">
                                {jwt 
                                ? <Link className="nav-link active" aria-current="page" to="/mypage">My page</Link>
                                : <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                }
                                
                            </li>
                            <li className="nav-item">
                                <div className="nav-link active" aria-current="page" onClick={orderPage} style={{cursor: 'pointer'}}>Order</div>
                            </li>
                            {jwt && <>
                                <li className="nav-item">
                                    <div className="nav-link active" aria-current="page">{money}￥</div>
                                </li>
                                <li className="nav-item" onClick={handleLogout} style={{cursor: 'pointer'}}>
                                    <div className="nav-link active" aria-current="page">Logout</div>
                                </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar