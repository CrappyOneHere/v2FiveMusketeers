import Sidebar from "./Sidebar"
function Orderplaced () {
    return (
        <>
            <div class="columns column1">
                <Sidebar />
            </div>

            <div class="columns column2">
                <h1 id="orders-placed-title">Order placed by customer</h1>

                <h5><u>Customer id:</u>112233</h5>
                <h5><u>Ordered/updated on:</u>12/03/2025</h5>

                <h5><u>Items ordered:</u></h5>
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
            <h5><u>Total cost:</u> $466</h5>
            </div>
        </>
    )
}
export default Orderplaced
