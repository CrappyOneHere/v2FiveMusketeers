import './rejectorder.css'
import Sidebar from './Sidebar'

function Rejectorder() {
    return (
        <>
            <div class="columns column1">
                <Sidebar />
            </div>

            <div class="columns column2">
                <h1 id="reject-title">Reject order</h1>
                <h3 id="products">Mouse, Laptop</h3>
                <p>Ordered / updated on: 12/03/2025</p>
                <p>Order placed by: 112233</p>
                <textarea id="reject-reason" rows="4" cols="50" placeholder="Enter the reason for rejection"></textarea>
                <button type="button" class="btn btn-danger" id="reject-btn">Reject order</button>
            </div>
        </>
    )
}
export default Rejectorder