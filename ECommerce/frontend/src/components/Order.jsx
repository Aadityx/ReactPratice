import Container from 'react-bootstrap/Container';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function Order() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/order/list', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                setOrders(data.orders);
            }
            else {
                console.error('Failed to log orders');
            }
        }
        catch (error) {
            console.error('Failed to log orders');
        }
    }

    return (
        <>
            <Container>
                <h1>Orders Page</h1>
                <Button variant="primary" onClick={() => window.location.href = '/products'}>Go to Products</Button>
                <Button variant="primary" onClick={() => {localStorage.clear(); window.location.href = '/'; }}>Logout</Button>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>OrderDate</th>
                            <th>Seller</th>
                            <th>Customer</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order =>
                            <tr key={order.id}>
                                <td>{order.products[0]?.productID?.productName}</td>
                                <td>{order.products[0]?.quantity}</td>
                                <td>{order.amount}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.sellerID?.name}</td>
                                <td>{order.customerID?.name}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>


        </>
    );
}
export default Order;