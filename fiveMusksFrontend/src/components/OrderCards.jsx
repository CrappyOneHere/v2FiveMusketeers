import { useNavigate } from 'react-router-dom';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function OrderCards(props) {
    console.log("ordercrads:", props.orderId)
    const nav = useNavigate();
    const deleteOrderHandler = async() => {
        try {
            const response = await axios.delete(`https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/buyer/deleteOrder?orderId=${props.orderId}`,
                {
                  headers: {
                    email: props.email
                  }
                }
            )
            alert(response.data)

        } catch (err) {
           alert("Error:", err.response.data)
        }
    }
    return (
        <Card style={{ width: '18rem' }} className='order-cards m-2'>
            <p
                className="view-order text-danger"
                onClick={() => nav(`/viewOrders/${props.orderId}`)}
            >View order</p>
            <Card.Body>
                <Card.Title>{`Order ${props.index}`}</Card.Title>
                <Card.Text>{`Date created: ${props.dateCreated}`}</Card.Text>
                <Card.Text>{`Order confirmed: ${props.orderConfirmed}`}</Card.Text>
                <div className='d-flex'>
                    <Button variant="dark" className='mx-1' onClick={() => nav(`/updateOrder/${props.orderId}`)}>Update</Button>
                    <Button variant="danger" onClick={() => deleteOrderHandler()}>Delete</Button>
                </div>

                <p className='text-danger checkout-text' onClick={() => nav(`/checkoutOrder/${props.orderId}`)}>{`→ Checkout`}</p>
            </Card.Body>
        </Card>
    );
}

export default OrderCards;
