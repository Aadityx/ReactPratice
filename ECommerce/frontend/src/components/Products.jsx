import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Products() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/products/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data.products);

            setProducts(data.products);
            console.log(products);
        }
        catch (error) {
            console.error('error fetching products', error);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        
        <Container>
            <h1>Products Page</h1>
            <Row>
                {products.map(product => (
                    <>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product.productImage} />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <Button variant="primary">Buy</Button>
                            </Card.Body> 
                        </Card> 
                        
                        
                    </>
                ))}
            </Row>
        </Container>
    );
}
export default Products;