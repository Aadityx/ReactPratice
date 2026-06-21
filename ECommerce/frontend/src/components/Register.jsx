import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [isRegistered, setRegistered] = useState('');
    const [error, setError] = useState('');


    const register = async() => {
        try{
            const response = await fetch('http://localhost:3000/auth/register',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({email, password})
            });
            const data = await response.json();
            if(response.ok) {
                setIsLoggedIn(true);
                setError('');
            } else{
                setError(data.message || 'Login Failed');
            }
        }
        catch(error){
            setError('Error occured. Try Again.')
        }
    }
    return (
        <div>
            <h1>Login page</h1>
            <Form onSubmit = {(e) => {e.preventDefault(); login();}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value= {email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value= {password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {error && <p style={{color : 'red'}} > {error}</p>}
            {isLoggedIn && <p style={{color : 'green'}}> Login Successful</p>}
        </div>
    )
}
export default Register;