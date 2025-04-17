import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateOrder(props) {
    const [quantities, setQuantities] = useState([])
    const [updatedOrderList, setUpdatedOrderList] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const {orderId} =  useParams()

    const updateOrderApi = async() => {
        try {
                const response = await axios.put(`https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/buyer/updateOrder?orderId=${orderId}`,
                {
                    updatedOrderList: updatedOrderList,
                },
                {
                    headers: {
                        email: props.email,
                    }
                }
            );
            alert(response.data.message)
        } catch(err) {
            alert(`Update order error: ${err.response.data}`)
        }
    }

    const orderListHandler = (prodId, qnty) => {
        setUpdatedOrderList((prevOrderList) => {
            if (Array.isArray(prevOrderList) && prevOrderList.length > 0) {
                const existingProduct = prevOrderList.find(p => p.productId === prodId)
                if (existingProduct) {
                    return prevOrderList.map(p => p.productId === prodId ? {...p, quantity: parseInt(qnty)} : p)
                } else {
                    return [...prevOrderList, {productId: prodId, quantity:parseInt(qnty)}]
                }
            } else {
                return [...prevOrderList, {productId: prodId, quantity:parseInt(qnty)}]

            }
        })
    }

    const fetchOrderDetails = async() => {
        console.log(props.email)
        try {
            const response = await axios.get('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/buyer/orderDetails',
                {
                  headers: {
                    email: props.email
                  }
                }
            )
            const orderInfo = response.data.find((order) => order.id === orderId)
            setOrderDetails(orderInfo.orderList)
        } catch (err) {
           alert("Error:", err)
        }
      }

      const handleQuantityChange = (prodId, quantity) => {
        setQuantities((prevQuantities) => {
            if (Array.isArray(prevQuantities) && prevQuantities.length > 0) {
                const prod = prevQuantities.find(p => p.productId === prodId)
                if (prod) {
                    return prevQuantities.map(p => p.productId === prodId ? {...p, quantity: parseInt(quantity)} : p);
                } else {
                    return [...prevQuantities, {productId: prodId, quantity:parseInt(quantity)}]
                }
            } else {
                return [{productId: prodId, quantity:parseInt(quantity)}]
            }
        })
      }
    useEffect(() => {
        if (props.email !== null) {
            fetchOrderDetails()
        }
    }, [props.email])

    return (
        <>
            <div className="flex-ratio-col1">
                <Sidebar setEmail={props.setEmail}
                         setName={props.setName}
                         email={props.email}
                         setUserRole={props.setUserRole}
                         userRole={props.userRole}/>
            </div>

            <div className="flex-wrap align-items-center justify-content-center">
                <h1 className="text-white mt-3 mb-5 pb-5 push-to-center">Update order</h1>
                <div className="cards-div d-flex flex-wrap justify-content-center">
                    {orderDetails.map((prod, index) => { console.log("prod:",prod);return (
                            <ProductCard key={index}
                            title={prod.name}
                            productId={prod.productId}
                            cost={prod.cost}
                            handleQuantityChange={handleQuantityChange}
                            orderListHandler={orderListHandler}/>
                    )})}
                </div>
                {orderDetails.length !== 0 &&
                <Button className="btn-light push-to-center" onClick={() => updateOrderApi()}>Update order</Button>}
            </div>
        </>
    )
}

export default UpdateOrder
