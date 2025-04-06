import './dispatch.css'
import Sidebar from './Sidebar'
function Dispatch () {
    return (
        <>
        <div class="columns column1">
            <Sidebar />
        </div>

        <div class="columns column2">
            <h1 id="dispatch-title">Dispatch advice</h1>
            <h5>
                <u>Items ordered:</u>
                <ul>
                    <li>Mouse</li>
                    <li>Keyboard</li>
                    <li>Laptop</li>
                </ul>
            </h5>
            <h5><u>Delivery address:</u> 123, StreetA, CityA, StateA, CountryA</h5>
            <h5><u>Date of issue:</u> 12/05/2025</h5>
            <h5><u>Shipment arrival period:</u> 17/05/2025</h5>
            <h5><u>Order reference:</u> 55555</h5>
        </div>
    </>
    )
}
export default Dispatch