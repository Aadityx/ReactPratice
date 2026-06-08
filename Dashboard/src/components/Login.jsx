import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const validateEmail=() =>{
    const correctEmail = "abc@gmail.com";
    const correctPassword = "12345";
    if(email === correctEmail && password === correctPassword){
      setIsLoggedIn(true);
      setShowError(false);
      navigate(`/dashboard/${email}`);
    } else {
      setIsLoggedIn(false);
      setShowError(true);
    }
  }
  return (
    
    <div className="login-container">
    <Form onSubmit = {(e) => {
      e.preventDefault();
      validateEmail();
    }}>
      <FormGroup className="Email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange = {(e) => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup className="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={password} onChange = {(e) => setPassword(e.target.value)} />
      </FormGroup>

      <Button variant="primary" type="submit">
        Login
      </Button>
      
      {isLoggedIn && <p>Login successful! Welcome, {email}.</p>}
      {showError && <p>Invalid email or password.</p>}
  
    </Form>
</div>
  )
}
export default Login