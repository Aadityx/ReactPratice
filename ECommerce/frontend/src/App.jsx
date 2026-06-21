import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  return (
    <>
    <div className='App'>
      <Routes>
      <Route path='/' element = {<Login />}/>
      <Route path='/register' element = {<Register />}/>
      </Routes>
    </div>
    </>
  )
}

export default App
