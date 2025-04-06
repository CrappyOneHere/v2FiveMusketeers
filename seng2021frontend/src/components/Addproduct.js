import Sidebar from "./Sidebar";
import './addproduct.css'

function Addproduct () {
    return (
        <>
            <div class="columns column1">
                <Sidebar />
            </div>

            <div class="columns column2">
                    <h1 id="products-title">Add Products:</h1>
                    <form>
                        <div class="form-group">
                            <label for="productName">Product name:</label>
                            <input type="text" class="form-control" id="productName" aria-describedby="nameOfProduct"/>
                        </div>
                        <div class="form-group">
                            <label for="productCost">Product cost:</label>
                            <input type="number" class="form-control" id="productCost"/>
                        </div>

                        <div class="form-group">
                            <label for="inStock">Stock remaining:</label>
                            <input type="number" class="form-control" id="inStock"/>
                        </div>
                        <br />
                        <button type="submit" class="btn btn-danger">Add</button>
                    </form>
            </div>
        </>
    )
}
export default Addproduct;