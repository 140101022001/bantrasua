import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { BACKEND_URL } from '../api/userApi';
import { FormEvent, useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userLoginSuccess } from '../redux/slice/authSlice';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState<any | undefined>();
    const [token, setToken] = useState('');
    const { jwt } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        axios.defaults.withCredentials = false;
        if (password && email) {
            await axios.post(`${BACKEND_URL}/api/login`, { email, password }).then((res: any) => {
                setToken(res.data.access_token);
            }).catch(err => setErr(err)
            );
        }
    }
    const getUserInfo = (token: string) => {
        axios.get(`${BACKEND_URL}/api/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((res: {
                data: {
                    id?: string,
                }
            }) => {
                const user = res.data;
                const jwt = token;
                const currentUser = { jwt, user };
                dispatch(userLoginSuccess(currentUser));
                navigate('/')
            }).catch(err => console.log(err));
    }
    useEffect(() => {
        if (token) {
            getUserInfo(token);
        }

    }, [token]);
    if (jwt) {
        return <Navigate to='/mypage' />
    }
    return (
        <>
            <div className="container">
                <h1>Login</h1>
                {err && <li className='alert alert-danger'>{err.response.data.error}</li>}
                {state && state.message && <p className='alert alert-success'>{state.message}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" name='email' value={email} className="form-control input" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name='password' value={password} className="form-control input" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="checkbox" />
                        <label className="form-check-label" htmlFor="checkbox">Remember me</label>
                    </div>
                    <div className="form-text"><Link to="/register" className="link">Register</Link></div><br />
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
