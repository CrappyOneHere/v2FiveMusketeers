import './viewinvoices.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar'

function Viewinvoices () {
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
                <h1 id="view-invoices-title">View invoices</h1>

                {orderVisible.order1 && (<div class="order order1">
                    <h3 class="products-invoice-title">Mouse, Laptop invoice</h3>
                    <p>Issued on: 12/03/2025</p>

                    <div id="update-delete-btns">
                    <button type="button" class="btn btn-primary" onClick={() => nav('/invoice')}>Update</button>
                    <button type="button" class="btn btn-danger" onClick={(event) => orderDeletion(event.target.closest('.order').classList[1])}>Delete</button>
                    </div>
                </div>)}

                {orderVisible.order2 && (<div class="order order2">
                    <h3 class="products-invoice-title">Microphone invoice</h3>
                    <p>Issued on: 02/03/2025</p>

                    <div id="update-delete-btns">
                    <button type="button" class="btn btn-primary" onClick={() => nav('/invoice')}>Update</button>
                    <button type="button" class="btn btn-danger"  onClick={(event) => orderDeletion(event.target.closest('.order').classList[1])}>Delete</button>
                    </div>
                </div>)}

                {orderVisible.order3 && (<div class="order order3">
                    <h3 class="products-invoice-title">Mouse, Microphone invoice</h3>
                    <p>Issued on: 15/03/2025</p>

                    <div id="update-delete-btns">
                    <button type="button" class="btn btn-primary" onClick={() => nav('/invoice')}>Update</button>
                    <button type="button" class="btn btn-danger"  onClick={(event) => orderDeletion(event.target.closest('.order').classList[1])}>Delete</button>
                    </div>
                </div>)}

                {orderVisible.order4 && (<div class="order order4">
                    <h3 class="products-invoice-title">Mouse, Microphone, Laptop invoice</h3>
                    <p>Issued on: 18/03/2025</p>

                    <div id="update-delete-btns">
                    <button type="button" class="btn btn-primary" onClick={() => nav('/invoice')}>Update</button>
                    <button type="button" class="btn btn-danger delete-btn"  onClick={(event) => orderDeletion(event.target.closest('.order').classList[1])}>Delete</button>
                    </div>
                </div>)}
            </div>
        </>
    )
}
export default Viewinvoices;