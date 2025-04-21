import SellerSideBar from "./SellerSideBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductOrderedCard from "./ProductOrderedCard";
import axios from "axios";

function SellerViewOrderDetails(props) {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState([])
  const [order, setOrder] = useState({})
  const [productsOrdered, setProductsOrdered] = useState([])

  const fetchOrderDetails = async() => {
    try {
        const response = await axios.get('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/seller/orders',
            {
              headers: {
                email: props.email
              }
            }
        )
        console.log("View Orders:", response.data)
        setOrderInfo(response.data)
        const orderDetails = response.data.filter((order) => order.id === id)
        setProductsOrdered(orderDetails[0].orderList)
        setOrder(orderDetails[0])
    } catch (err) {
       alert("Error:", err)
    }
  }


    useEffect(() => {
      if (props.email !== null && props.email !== undefined && props.email !== '') {
          fetchOrderDetails()
      }
  }, [props.email])

  return (
    <>
      <div className="flex-ratio-col1">
                  <SellerSideBar setEmail={props.setEmail}
                          setName={props.setName}
                          email={props.email}
                          setUserRole={props.setUserRole}
                          userRole={props.userRole}/>
      </div>
      <div>
        <h1 className="text-white push-to-center mt-4 mb-5">Order Details</h1>
        <h5 className="text-white push-to-center">{`🆔 Order id: ${order.id}`}</h5>
        <br />
        <h5 className="text-white push-to-center">{`🗓️ Date created: ${order.dateCreated}`}</h5>
        <br />
        <h5 className="text-white push-to-center">{`⏳ Status: ${order.status}`}</h5>
        <br />
        <h5 className="text-white push-to-center">{`👍 Order confirmation: ${order.orderConfirmation}`}</h5>
        <br />
        <h5 className="text-white push-to-center">{`🤑 Total cost: $${order.totalCost}`}</h5>
        <br />
        <h5 className="text-white push-to-center mt-5">{`🛒 Products ordered:`}</h5>

        <div className='cards-div d-flex flex-wrap justify-content-center'>
          {productsOrdered.map((product, index) => {
            return (
              <ProductOrderedCard title={product.name}
                                  key={index}
                                  quantity={product.quantity}
                                  email={props.email}
                                  cost={product.cost}
                                  />
            )
          })}
        </div>
      </div>
    </>
  );
}
export default SellerViewOrderDetails;
