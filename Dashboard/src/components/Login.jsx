import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Login() {
  return (
    <div className="login-container">
    <Form>
      <FormGroup className="Email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </FormGroup>
      <FormGroup className="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
      </FormGroup>

      <Button variant="primary" type="submit">
        <Link to="/dashboard">Login</Link>
      </Button>
    </Form>
</div>
  )
}
export default Login