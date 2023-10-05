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
import Manegement from './user/Manegement';
import Benefit from './user/Benefit';
import NotFound from './user/NotFound';

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
        <Route path='/manegement' element={<Manegement/>} />
        <Route path='/benefit' element={<Benefit/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
