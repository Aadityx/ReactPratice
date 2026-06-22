import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';

function App() {

  return (
    <>
    <div className='App'>
      <Routes>
      <Route path='/' element = {<Login />}/>
      <Route path='/register' element = {<Register />}/>
      <Route path='/products' element = {<Products />}/>
      </Routes>
    </div>
    </>
  )
}

export default App
