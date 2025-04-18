import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";

function CreateOrder(props) {
    const [products, setProducts] = useState([])
    const [quantities, setQuantities] = useState([])
    const [orderList, setOrderList] = useState([])
    const [sellers, setSellers] = useState([])
    const [selectedSellerEmail, setSelectedSellerEmail] = useState("")
    const [dropdownText, setDropdownText] = useState("Sellers")

    const orderListHandler = (prodId, qnty) => {
        setOrderList((prevOrderList) => {
            const existingProduct = prevOrderList.find(p => p.productId === prodId)
            if (existingProduct) {
                return prevOrderList.map(p => p.productId === prodId ? {...p, quantity: parseInt(qnty)} : p)
            } else {
                return [...prevOrderList, {productId: prodId, quantity:parseInt(qnty)}]
            }
        })
    }

    const getAllProducts = async() => {
        if (selectedSellerEmail === "") {
            return
        }
        try {
            const response = await axios.get('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/seller/products', {
                headers: {
                    email: selectedSellerEmail
                }
            })
            setProducts(response.data)
        } catch (err) {
            if (err.status === 404) {
                alert("No products found for this seller")
                setProducts([])
                setOrderList([])
            }
        }
    }

    const getAllSellers = async() => {
        if (props.email === null) {
            return
        }
        try {
            const response = await axios.get('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/buyer/sellers', {
                headers: {
                    email: props.email
                }
            })
            setSellers(JSON.parse(response.data.body))
        } catch (err) {
            alert("Error:", err)
        }
    }
    const createOrderApi = async() => {
        try {
                const response = await axios.post('https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/buyer/createOrder',
                {
                    orderList: orderList,
                    seller: selectedSellerEmail,
                },
                {
                    headers: {
                        email: props.email,
                    }
                }
              );
            alert(response.data.message)
        } catch(err) {
            alert(`create order error: ${err.response.data}`)
        }
    }

    useEffect(() => {
        getAllSellers()
    }, [props.email])

    useEffect(() => {
        getAllProducts()
    }, [selectedSellerEmail])

    const handleQuantityChange = (productId, qnty) => {
        setQuantities((prevQuantities) => {
            const product = prevQuantities.find(p => p.productId === productId)
            if (product) {
                return prevQuantities.map(p => p.productId === productId ? {...p, quantity: parseInt(qnty)} : p)
            } else {
                return [...prevQuantities, {productId: productId, quantity: parseInt(qnty)}]
            }
        })
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

            <div className="flex-wrap align-items-center justify-content-center">
                <h1 className="text-white mt-3 mb-5 pb-5 push-to-center">Create order</h1>

                <h4 className="text-white push-to-center">Select Seller</h4>
                <Dropdown className="text-white push-to-center">
                    <Dropdown.Toggle variant="light" className = "mb-5" id="dropdown-basic">
                        {dropdownText}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {}
                        {sellers.map((s, index) =>
                            <Dropdown.Item key={index}
                            onClick={() => {setDropdownText(s.name); setSelectedSellerEmail(s.email)}}
                            >{s.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <h4 className="text-white mt-5 push-to-center">Select products:</h4>
                <div className="cards-div d-flex flex-wrap justify-content-center">
                {products.map((p, index) =>
                    <ProductCard key={index}
                                 productId={p.id}
                                 title={p.name}
                                 cost={p.cost}
                                 handleQuantityChange={handleQuantityChange}
                                 orderListHandler={orderListHandler}/>
                )}
                </div>

                {products.length !== 0 &&
                <Button className="btn-light push-to-center" onClick={() => createOrderApi()}>Confirm orders</Button>}
            </div>
        </>
    )
}

export default CreateOrder
