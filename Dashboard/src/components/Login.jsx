import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function Login() {
  const [email, setEmail] = useState('');

  return (
    
    <div className="login-container">
    <Form>
      <FormGroup className="Email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange = {(e) => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup className="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
      </FormGroup>

      <Button variant="primary" type="submit">
        <Link to={`/dashboard/${email}`}>Login</Link>
      </Button>
    </Form>
</div>
  )
}
export default Login