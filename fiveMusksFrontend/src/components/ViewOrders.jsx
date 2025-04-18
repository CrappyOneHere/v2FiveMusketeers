import OrderCards from './OrderCards';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from "axios";

function ViewOrders(props) {
    const [orderInfo, setOrderInfo] = useState([])

    const fetchAllOrders = async() => {
        try {
            const response = await axios.get('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/buyer/orderDetails',
                {
                    headers: {
                        email: props.email
                    }
                }
            )
            setOrderInfo(response.data)
        } catch (err) {
           alert(`Error: ${err.response.data}`)
        }
    }

    useEffect(() => {
        if (props.email !== null && props.email !== undefined && props.email !== '') {
            fetchAllOrders()
        }
    }, [props.email])

    return (
        <>
            <div className="flex-ratio">
                <div className="flex-ratio-col1">
                <Sidebar setEmail={props.setEmail}
                        setName={props.setName}
                        email={props.email}
                        setUserRole={props.setUserRole}
                        userRole={props.userRole}/>
                </div>
                <div>
                    <h1 className="push-to-center text-white mt-3">🛒 All orders placed</h1>
                    <div className='cards-div d-flex flex-wrap justify-content-center'>
                    {orderInfo.map((order, index) => {
                        return (
                            <OrderCards key={index}
                                        email={props.email}
                                        index={index + 1}
                                        orderId={order.id}
                                        dateCreated={order.dateCreated.slice(0, 10)}
                                        orderConfirmed={order.orderConfirmation}/>
                        )
                    })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewOrders;
