import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useEffect } from 'react';
function Sidebar(props) {
    const nav = useNavigate()

    const logoutHandler = async() => {
        console.log(props)
        try {
            await axios.put('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/logout',
                {},
                    {
                    headers: {
                        email: props.email,
                        role: props.userRole,
                    }
                }
              );
              props.setName(null)
              props.setEmail(null)
              props.setUserRole(null)
              localStorage.removeItem('email')
              localStorage.removeItem('name')
              localStorage.removeItem('userRole')
              nav('/')
        } catch (err) {
           console.log("Error:", err)
        }
    }

        return (
            <>
                <Offcanvas show={true} className="bg-white" backdrop={false}>
                    <Offcanvas.Header>
                    <Offcanvas.Title>Actions</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ul>
                            <li className="list-group-item mb-4 link-hover" onClick={() => nav('/createOrder')}>Create order</li>
                            <li className="list-group-item link-hover mb-4" onClick={() => nav('/viewOrders')}>View orders</li>
                            <li className="list-group-item link-hover mb-4" onClick={() => nav('/invoice')}>Invoice</li>
                            <li className="list-group-item link-hover" onClick={() => nav('/dispatch')}>Dispatch</li>
                        </ul>
                        <Button className="btn-dark v-end" onClick={() => logoutHandler()}>Logout</Button>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )
}

export default Sidebar;
