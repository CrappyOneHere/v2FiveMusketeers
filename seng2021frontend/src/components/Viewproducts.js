import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import './viewproducts.css'

function Viewproducts () {
    const nav = useNavigate()
    return (
        <>
            <div class="columns column1">
                <Sidebar />
            </div>

            <div class="columns column2">
                <div id="heading">
                    <h1 id="products-title">Products:</h1>
                    <button type="button" class="btn btn-danger" id="add-product-btn" onClick={() => nav('/addProduct')}> + Add product</button>
                </div>

                <div class="products">
                    <div class="product">
                        <h3>Mouse</h3>
                        <p>Price: $10</p>
                        <p>Stock remaining: 50</p>
                    </div>

                    <div class="product">
                        <h3>Laptop</h3>
                        <p>Price: $300</p>
                        <p>Stock remaining: 30</p>
                    </div>

                    <div class="product">
                        <h3>Microphone</h3>
                        <p>Price: $78</p>
                        <p>Stock remaining: 20</p>
                    </div>

                    <div class="product">
                        <h3>Smart watch</h3>
                        <p>Price: $150</p>
                        <p>Stock remaining: 0</p>
                        <b>!!!Out of stock!!!</b>
                    </div>

                    <div class="product">
                        <h3>Ipad</h3>
                        <p>Price: $400</p>
                        <p>Stock remaining: 0</p>
                        <b>!!!Out of stock!!!</b>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Viewproducts;