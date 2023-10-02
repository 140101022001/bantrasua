import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './user/Register';
import Navbar from './components/Navbar';
import Home from './Home';
import Login from './user/Login';
import Mypage from './user/Mypage';
import AccessDenied from './user/AccessDenied';
import Order from './user/Order';
import History from './user/History';

function App() {
  return(
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/mypage' element={<Mypage/>}/>
        <Route path='/access-denied' element={<AccessDenied/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/history' element={<History/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
