import { useEffect, useState } from 'react';
import SellerSideBar from './SellerSideBar';
import axios from "axios";
import { Button, Modal, Form } from 'react-bootstrap';
import SellerProductCard from './SellerProductCard';

function SellerViewProducts(props) {
    const [productInfo, setProductInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [stockRemaining, setStockRemaining] = useState(0);

    const fetchAllProducts = async() => {
        try {
            const response = await axios.get('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/seller/products',
                {
                    headers: {
                        email: props.email
                    }
                }
            )
            setProductInfo(response.data)
        } catch (err) {
            if (err.response?.status === 404) {
                setProductInfo([]); 
                alert("This seller has not added any products.");
            } else {
                console.error("Failed to fetch products:", err);
            }
        }
    }

    useEffect(() => {
        if (props.email !== null && props.email !== undefined && props.email !== '') {
            fetchAllProducts()
        }
    }, [props.email])

    const handleShow = () => setShowModal(true);
    const handleClose = () =>  {
        setShowModal(false);
        setName('');
        setCost(0);
        setStockRemaining(0);
    }

    const handleSubmit = async () => {
        try {
        
            const response = await axios.post('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/seller/addProduct', 
                {name: name, cost: cost, stockRemaining: stockRemaining}, 
                {
                    headers: {
                        email: props.email,
                    }
                }
            );

            handleClose();
            fetchAllProducts(); // refresh the product list
            alert(response.data.message)    
         
        } catch (err) {
            // alert("Failed to add product:", err);
        }
    };

    return (
        <>
        <div className="flex-ratio">
            <div className="flex-ratio-col1">
            <SellerSideBar setEmail={props.setEmail}
                    setName={props.setName}
                    email={props.email}
                    setUserRole={props.setUserRole}
                    userRole={props.userRole}/>
            </div>

            <div>
                <h1 className="push-to-center text-white mt-3">All existing products</h1>
                <button className="push-to-left btn btn-success mt-4 mb-5" onClick={handleShow}>
                    + Add Product 
                </button>
                <div className='cards-div d-flex flex-wrap justify-content-center'>
                    {productInfo.map((product, index) => {
                        return (
                            <SellerProductCard title={product.name}
                                                key={index}
                                                quantity={product.stockRemaining}
                                                email={props.email}
                                                productId={product.id}
                                                cost={product.cost}
                                                onView={() => alert(`Viewing: ${product.name}`)}
                                                refreshProducts={fetchAllProducts}
                                                />
                        )
                    })}
                </div> 
            </div>

        </div>
           <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName((e.target.value).toString())}
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Cost</Form.Label>
                            <Form.Control
                                type="number"
                                name="cost"
                                value={cost}
                                onChange={(e) => setCost(parseInt(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Add Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stockRemaining"
                                value={stockRemaining}
                                onChange={(e) => setStockRemaining(parseInt(e.target.value))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default SellerViewProducts;