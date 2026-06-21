import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [isRegistered, setRegistered] = useState(false);
    const [error, setError] = useState('');

    const register = async () => {
        try {

            console.log({
                name,
                email,
                password,
                userType
            });

            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    userType
                })
            });

            const data = await response.json();

            console.log("Status:", response.status);
            console.log("Data:", data);

            if (response.ok) {
                setRegistered(true);
                setError('');
            } else {
                setRegistered(false);
                setError(data.message || 'Registration Failed');
            }

        } catch (error) {
            console.error(error);
            setError('Error occurred. Try Again.');
        }
    };

    return (
        <div>
            <h1>Register Page</h1>

            <Form onSubmit={(e) => {
                e.preventDefault();
                register();
            }}>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUserType">
                    <Form.Label>Select User Type</Form.Label>

                    <Form.Check
                        type="radio"
                        name="userType"
                        id="customer"
                        label="Customer"
                        value="customer"
                        checked={userType === 'customer'}
                        onChange={(e) => setUserType(e.target.value)}
                    />

                    <Form.Check
                        type="radio"
                        name="userType"
                        id="seller"
                        label="Seller"
                        value="seller"
                        checked={userType === 'seller'}
                        onChange={(e) => setUserType(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>

            </Form>

            {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
            )}

            {isRegistered && (
                <p style={{ color: 'green' }}>
                    Registration Successful
                </p>
            )}
        </div>
    );
}

export default Register;