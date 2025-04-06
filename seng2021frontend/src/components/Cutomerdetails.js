import './customerdetails.css'
import Sidebar from './Sidebar'

function Customerdetails () {
    return (
        <>
            <div class="columns column1">
                <Sidebar />
            </div>

            <div class="columns column2">
                <h1 id="customer-details-title">Customer details</h1>

                <h5 class="customer-details cust-name"><u>Customer name: </u>George</h5>
                <h5 class="customer-details cust-id"><u>Customer id:</u> 112233</h5>
                <h5 class="customer-details cust-name"><u>Customer delivery address:</u> U 123, Building A, Street A, City A, Country A</h5>

                <h5 class="customer-details cust-orders"><u>Orders:</u></h5>

                <div class="order order1">
                    <h3 class="products-title">Mouse, Laptop</h3>
                    <p>Ordered / updated on: 12/03/2025</p>
                    <p>Order id: 111111</p>
                </div>

                <div class="order order2">
                    <h3 class="products-title">Microphone</h3>
                    <p>Ordered / updated on: 02/03/2025</p>
                    <p>Order id: 222222</p>
                </div>

                <div class="order order3">
                    <h3 class="products-title">Mouse, Microphone</h3>
                    <p>Ordered / updated on: 15/03/2025</p>
                    <p>Order id: 333333</p>
                </div>

                <div class="order order4">
                    <h3 class="products-title">Mouse, Microphone, Laptop</h3>
                    <p>Ordered / updated on: 18/03/2025</p>
                    <p>Order id: 444444</p>
                </div>
            </div>
        </>
    )
}
export default Customerdetails
