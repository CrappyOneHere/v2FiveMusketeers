import './createorder.css'

import Sidebar from './Sidebar'
function Create () {
    return (
        <>
            <div class="columns column1">
                <Sidebar />
            </div>

            <div class="columns column2">
                <h1 id="create-title">Create order</h1>

                <div id="products">
                    <p id="products-title">List of products available:</p>
                    <div class="btn-group">
                        <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Products
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Mouse: $10</a></li>
                            <li><a class="dropdown-item" href="#">Laptop: $300</a></li>
                            <li><a class="dropdown-item" href="#">Microphone: $78</a></li>
                        </ul>
                    </div>
                </div>

                <div id="quantity">
                    <label for="quantity">Quantity (between 1 and 50):</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="50" />
                </div>

                <div id="address">
                    <label for="address">Delivery address:</label>
                    <textarea type="textarea" id="address" name="address" rows="5" cols="30"/>
                </div>

                <h3 id="total-cost">Total Cost: $10</h3>

                <div id="confirm">
                    <input type="checkbox" id="confirm" name="confirm"/>
                    <label for="confirm">Confirm order</label>
                </div>

                <button type="button" class="btn btn-danger">Create</button>
            </div>
        </>
    )
}
export default Create
