import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import Home from './components/home';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import {Nav} from 'react-bootstrap';

function App() {

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <BrowserRouter>
      <Nav className="navbar">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/login">Login</NavLink>
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
        <NavLink className="nav-link" to="/signup">Signup</NavLink>
        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
      </Nav>

      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/contact" element={<Contact />} />
        <Route path ="/login" element={<Login />} />
        <Route path ="/signup" element={<SignUp />} />
        <Route path ="/dashboard/:email" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
