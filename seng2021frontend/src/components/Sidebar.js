import hamburger from '../images/hamburger.png'
import { useNavigate } from 'react-router-dom'
import './sidebar.css'

function Sidebar () {
    const nav = useNavigate()
    return (
        <>
        <button class="btn btn-danger" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                    <img src={hamburger} id="hamburger-img" alt="hamburger-img"/>
                </button>

                <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="staticBackdropLabel">Actions</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <h5 id="buyer-title">Buyer</h5>
                    <br />
                    <div class="actions"  onClick={() => nav('/')}> Create order </div>
                    <br />
                    <div class="actions"  onClick={() => nav('/viewOrders')}> View orders </div>
                    <br />
                    <div class="actions"  onClick={() => nav('/viewInvoices')}> View invoices </div>
                    <br />
                    <div class="actions"  onClick={() => nav('/viewDispatches')}> View dispatches </div>
                    <br />

                    <h5 id="buyer-title">Seller</h5>
                    <div class="actions"  onClick={() => nav('/ordersPlaced')}> View orders placed </div>
                    <br />
                    <div class="actions"  onClick={() => nav('/viewProducts')}> View products </div>
                    <br />
                </div>
            </div>
        </>
    )
}
export default Sidebar;