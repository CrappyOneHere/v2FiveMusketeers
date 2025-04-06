import './viewordersplaced.css'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Viewordersplaced () {
    const nav = useNavigate()
    const [orderVisible, setOrderVisible] = useState ({
        order1: true,
        order2: true,
        order3: true,
        order4: true
    })

    const orderDeletion = (orderClass) => {
        setOrderVisible(visibility => ({
            ...visibility,
            [orderClass]: false,
        }))
    }
    return (
        <>
        <div class="columns column1">
            <Sidebar />
        </div>

        <div class="columns column2">
            <h1 id="orders-placed-title">Orders placed</h1>
            {orderVisible.order1 && (<div class="order order1">
                    <h3 class="products-orders-title">Mouse, Laptop</h3>
                    <p>Ordered/updated on: 12/03/2025</p>
                    <p>Order status: Created</p>
                    <div class="order-created-by">
                        <p>Order created by: 112233</p>
                        <button type="button" class="btn btn-secondary customer-details-btn" onClick = {() => nav('/customerDetails')}>Customer's details</button>
                    </div>

                    <div class="update-reject-btns">
                        <button type="button" class="btn btn-primary" onClick={() => nav('/orderPlacedByCustomer')}>View</button>
                        <button type="button" class="btn btn-danger" onClick={() => nav('/rejectOrder')}>Reject</button>
                    </div>
                </div>)}

                {orderVisible.order2 && (<div class="order order2">
                    <h3 class="products-orders-title">Microphone</h3>
                    <p>Ordered/updated on: 02/03/2025</p>
                    <p>Order status: Created</p>
                    <div class="order-created-by">
                        <p>Order created by: 112233</p>
                        <button type="button" class="btn btn-secondary customer-details-btn" onClick = {() => nav('/customerDetails')}>Customer's details</button>
                    </div>

                    <div class="update-reject-btns">
                        <button type="button" class="btn btn-primary" onClick={() => nav('/orderPlacedByCustomer')}>View</button>
                        <button type="button" class="btn btn-danger" onClick={() => nav('/rejectOrder')}>Reject</button>
                    </div>
                </div>)}

                {orderVisible.order3 && (<div class="order order3">
                    <h3 class="products-orders-title">Mouse, Microphone</h3>
                    <p>Ordered/updated on: 15/03/2025</p>
                    <p>Order status: Created</p>
                    <div class="order-created-by">
                        <p>Order created by: 112233</p>
                        <button type="button" class="btn btn-secondary customer-details-btn" onClick = {() => nav('/customerDetails')}>Customer's details</button>
                    </div>

                    <div class="update-reject-btns">
                        <button type="button" class="btn btn-primary" onClick={() => nav('/orderPlacedByCustomer')}>View</button>
                        <button type="button" class="btn btn-danger" onClick={() => nav('/rejectOrder')}>Reject</button>
                    </div>
                </div>)}

                {orderVisible.order4 && (<div class="order order4">
                    <h3 class="products-orders-title">Mouse, Microphone, Laptop</h3>
                    <p>Ordered/updated on: 18/03/2025</p>
                    <p>Order status: Created</p>
                    <div class="order-created-by">
                        <p>Order created by: 112233</p>
                        <button type="button" class="btn btn-secondary customer-details-btn" onClick = {() => nav('/customerDetails')}>Customer's details</button>
                    </div>

                    <div class="update-reject-btns">
                        <button type="button" class="btn btn-primary" onClick={() => nav('/orderPlacedByCustomer')}>View</button>
                        <button type="button" class="btn btn-danger Reject-btn" onClick={() => nav('/rejectOrder')}>Reject</button>
                    </div>
                </div>)}
        </div>
    </>
    )
}
export default Viewordersplaced