import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowerserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './components/home';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/about" element={<Contact />} />
        <Route path ="/contact" element={<Login />} />
        <Route path ="/signup" element={<SignUp />} />
        <Route path ="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>


      <Nav className="navbar">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/about">About</NavLink>
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
        <NavLink className="nav-link" to="/signup">Signup</NavLink>
        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
      </Nav>
    </div>
  )
}

export default App
