import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';


function Products() {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedProductID, setSelectedProductID] = useState(null);
    const [quantity, setQuantity] = useState(1);
    
    const handleClose = () =>{ setShow(false); setSelectedProductID(null);}
    const handleShow = () => {setShow(true); setQuantity(1);}

    const handleBuyProduct = (productId) => {
        setSelectedProductID (productId);
        handleShow();
    }

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
        <>
            <Container>
                <h1>Products Page</h1>
                <Row>
                    {products.map(product => (
                        <Col md={4} className="mb-3" key={product._id}>
                            <Card style={{ width: '18rem' }} key={product._id}>
                                <Card.Img variant="top" src={product.productImage} />
                                <Card.Body>
                                    <Card.Title>{product.productName}</Card.Title>
                                    <Card.Text>
                                        {product.description}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleBuyProduct(product._id)}>Buy</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <h1>Buy Product</h1>
                    <h2>{products.find(product => product._id === selectedProductID)?.productName}</h2>
                    <input type='number' min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleBuyProduct()}>Buy Product</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Products;