import './vieworders.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar'

function Vieworders () {
    const nav = useNavigate()
    const [orderVisible, setOrderVisible] = useState ({
        order1: true,
        order2: true,
        order3: true,
        order4: true
    })

    const orderDeletion = (orderclass) => {
        setOrderVisible(visibility => ({
            ...visibility,
            [orderclass]: false,
        }))
    }
    return (
        <>
            <div class="columns column1">
                <Sidebar />
            </div>

            <div class="columns column2">
                <h1 id="view-orders-title">View orders</h1>

                {orderVisible.order1 && (<div class="order order1">
                    <h3 class="products-title">Mouse, Laptop</h3>
                    <p>Ordered / updated on: 12/03/2025</p>

                    <div id="update-delete-btns">
                    <button type="button" class="btn btn-primary" onClick={() => nav('/updateOrders')}>Update</button>
                    <button type="button" class="btn btn-danger" onClick={(event) => orderDeletion(event.target.closest('.order').classList[1])}>Delete</button>
                    </div>
                </div>)}

                {orderVisible.order2 && (<div class="order order2">
                    <h3 class="products-title">Microphone</h3>
                    <p>Ordered / updated on: 02/03/2025</p>

                    <div id="update-delete-btns">
                        <button type="button" class="btn btn-primary" onClick={() => nav('/updateOrders')}>Update</button>
                        <button type="button" class="btn btn-danger"  onClick={(event) => orderDeletion(event.target.closest('.order').classList[1])}>Delete</button>
                    </div>
                </div>)}

                {orderVisible.order3 && (<div class="order order3">
                    <h3 class="products-title">Mouse, Microphone</h3>
                    <p>Ordered / updated on: 15/03/2025</p>

                    <div id="update-delete-btns">
                    <button type="button" class="btn btn-primary" onClick={() => nav('/updateOrders')}>Update</button>
                    <button type="button" class="btn btn-danger"  onClick={(event) => orderDeletion(event.target.closest('.order').classList[1])}>Delete</button>
                    </div>
                </div>)}

                {orderVisible.order4 && (<div class="order order4">
                    <h3 class="products-title">Mouse, Microphone, Laptop</h3>
                    <p>Ordered / updated on: 18/03/2025</p>

                    <div id="update-delete-btns">
                    <button type="button" class="btn btn-primary" onClick={() => nav('/updateOrders')}>Update</button>
                    <button type="button" class="btn btn-danger delete-btn"  onClick={(event) => orderDeletion(event.target.closest('.order').classList[1])}>Delete</button>
                    </div>
                </div>)}
            </div>
        </>
    )
}
export default Vieworders;
