import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import Sidebar from "./Sidebar"
function InvoiceDetails (props) {
    const [orderInfo, setOrderInfo] = useState([])
    const [order, setOrder] = useState({})
    const [productsOrdered, setProductsOrdered] = useState([])

    useEffect(() => {
        if (props.email !== null && props.email !== undefined && props.email !== '') {
            fetchOrderDetails()
        }
    }, [props.email])

    const fetchOrderDetails = async() => {
        try {
            const response = await axios.get('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/buyer/orderDetails',
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
        //    alert("Error:", err)
           console.log(err)
        }
      }

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
              <h1 className="text-white push-to-center mt-4 mb-5">Invoice:</h1>
              <h5 className="text-white push-to-center">{`🆔 Order id: 778b72fa-f84c-4019-b04c-a69992eb54f9orderId`}</h5>
              <br />
              <h5 className="text-white push-to-center">{`🗓️ Date created: 22-04-2025`}</h5>
              <br />
              <h5 className="text-white push-to-center">{`⏳ Status: COMPLETED`}</h5>
              <br />
              <h5 className="text-white push-to-center">{`👍 Order confirmation: True`}</h5>
              <br />
              <h5 className="text-white push-to-center">{`🤑 Total cost: $80`}</h5>
              <br />
              <h5 className="text-white push-to-center mt-5">{`🛒 Products ordered:`}</h5>
              <ul className="text-white push-to-center">
                  <h5><li className="text-white">Grass x2 --- $40</li></h5>
                  <h5><li className="text-white">Apples x2 --- $40</li></h5>
                  <p className="text-white">---------------------</p>
                  <h5><p className="text-danger">Total: $80</p></h5>
              </ul>

              <h5 className="text-white push-to-center mt-5 pt-5"> Approved by seller: hi</h5>

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
    )
}

export default InvoiceDetails;