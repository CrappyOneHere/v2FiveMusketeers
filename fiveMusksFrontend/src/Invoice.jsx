import { useNavigate } from "react-router-dom"
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Invoice (props) {
    const nav = useNavigate()
    return (
        <>
        <div className="flex-ratio-col1">
                  <Sidebar setEmail={props.setEmail}
                          setName={props.setName}
                          email={props.email}
                          setUserRole={props.setUserRole}
                          userRole={props.userRole}/>
            </div>
            <div>
             <h1 className="text-white push-to-center">Order invoices</h1>
            <Card style={{ width: '18rem' }} className="push-to-center">
                <Card.Body>
                    <Card.Title>Order 1</Card.Title>

                    <Button variant="dark" onClick={() => nav('/invoiceDetails')}>→View invoice</Button>
                </Card.Body>
            </Card>
            </div>
        </>
    )
}

export default Invoice;