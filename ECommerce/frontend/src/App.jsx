import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import Order from './components/Order';

function App() {

  return (
    <>
    <div className='App'>
      <Routes>
      <Route path='/' element = {<Login />}/>
      <Route path='/register' element = {<Register />}/>
      <Route path='/products' element = {<Products />}/>
      <Route path= '/order' element = {<Order />}/>
      </Routes>
    </div>
    </>
  )
}

export default App
