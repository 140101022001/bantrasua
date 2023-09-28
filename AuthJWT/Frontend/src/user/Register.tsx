import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../api/userApi';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    const [err, setErr] = useState<any| undefined>();
    const navigate = useNavigate();
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        axios.defaults.withCredentials = false;
        if (password && email) {
            await axios.post(`${BACKEND_URL}/api/register`, {email, password, password_confirmation, name}).then(res => {
                navigate('/login', {state: { message: res.data.message }});
            }).catch(err => setErr(err)
            );
        }
    }
    return (
        <div className="container">
            <h1>Register</h1>
            {err && <li className='alert alert-danger'>{err.response.data.error}</li>}
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" value={email} className="form-control input" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" value={password} className="form-control input" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmationPassword" className="form-label">Confirmation Password</label>
                    <input type="password" name="password_confirmation" value={password_confirmation} className="form-control input" id="confirmationPassword" onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="name" name="name" value={name} className="form-control input" id="name" aria-describedby="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-text"><Link to="/login" className="link">Login</Link></div><br />
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default Register