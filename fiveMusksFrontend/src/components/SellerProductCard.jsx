import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; 
import axios from "axios";

function SellerProductOrderedCard(props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteProductHandler = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${props.title}"?`);
        if (!confirmDelete) return;
      
        try {
          setIsDeleting(true);
      
          const response = await axios.delete(
            'https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/seller/deleteProduct',
            {
              headers: {
                email: props.email,
              },
              data: {
                productId: props.productId
              }
            }
          );
      
          alert(response.data.message || 'Product deleted successfully');
          props.refreshProducts(); // Refresh product list
        } catch (err) {
          console.error(err);
          alert("Error deleting product: " + (err.response?.data?.error || err.message));
        } finally {
          setIsDeleting(false);
        }
    };
    return (
        <Card style={{ width: '18rem' }} className="m-2">
            <Card.Body>
            <div className="d-flex justify-content-between">
                <Card.Title>{props.title}</Card.Title>
                <p className="text-danger">{`Price: $${props.cost}`}</p>
            </div>
            <Card.Text>{`Quantity: ${props.quantity}`}</Card.Text>

            <div className="d-flex justify-content-between mt-3">
                <Button variant="dark" size="sm" onClick={props.onView}>View</Button>
                <Button variant="danger" size="sm" disabled={isDeleting} onClick={deleteProductHandler}> {isDeleting ? "Deleting..." : "Delete"}</Button>
            </div>
            </Card.Body>
        </Card>
    );
}
export default SellerProductOrderedCard;
