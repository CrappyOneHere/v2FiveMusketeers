import Sidebar from "./Sidebar"
import './invoice.css'
function Invoice () {
    return (
        <>
        <div class="columns column1">
            <Sidebar />
        </div>

        <div class="columns column2">
            <h1 id="invoice-title">Invoice</h1>
            <h5><u>Name:</u> John</h5>
            <h5><u>Delivery address:</u> 123, StreetA, CityA, StateA, CountryA</h5>
            <h5><u>Date of issue:</u> 12/05/2025</h5>
            <h5><u>Invoice no:</u> 55555</h5>

            <table class="table table-dark">
                <thead>
                    <tr>
                    <th scope="col" className="heading">#</th>
                    <th scope="col" className="heading">Description</th>
                    <th scope="col" className="heading">Quantity</th>
                    <th scope="col" className="heading">Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mouse</td>
                    <td>1</td>
                    <td>$10.00</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Microphone</td>
                    <td>2</td>
                    <td>$156.00</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Laptop</td>
                    <td>1</td>
                    <td>$300.00</td>
                    </tr>
                </tbody>
            </table>

            <h5 id="total-cost"><u>Total cost:</u> $466</h5>
        </div>
    </>
    )
}
export default Invoice