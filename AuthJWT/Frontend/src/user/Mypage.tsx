import useAuth from "../hooks/useAuth"
import { Navigate } from 'react-router-dom'

const Mypage = () => {
    const { jwt }= useAuth();
    if(!jwt) {
        return <Navigate to='/login'/>
    }
    return (
        <div>Mypage</div>
    )
}

export default Mypage