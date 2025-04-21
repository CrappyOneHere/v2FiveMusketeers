import { useEffect, useState } from 'react';
import SellerSideBar from './SellerSideBar';
import axios from "axios";
import SellerOrderCard from "./SellerOrderCard";

function SellerViewOrders(props) {
    const [orderInfo, setOrderInfo] = useState([])

    const fetchAllOrders = async() => {
        try {
            const response = await axios.get('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/seller/orders',
                {
                    headers: {
                        email: props.email
                    }
                }
            )
            setOrderInfo(response.data)
        } catch (err) {
  
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
            <SellerSideBar setEmail={props.setEmail}
                    setName={props.setName}
                    email={props.email}
                    setUserRole={props.setUserRole}
                    userRole={props.userRole}/>
            </div>
            
            <div>
                <h1 className="push-to-center text-white mt-3">All orders received</h1>
                <div className='cards-div d-flex flex-wrap justify-content-center'> 
                {orderInfo.map((order, index) => {
                    return (
                        <SellerOrderCard key={index}
                                         index={index + 1}
                                         orderId={order.id}
                                         buyerEmail={order.email}
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
export default SellerViewOrders;