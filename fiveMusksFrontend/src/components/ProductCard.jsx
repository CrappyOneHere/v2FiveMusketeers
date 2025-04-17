import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
function ProductCard(props) {
    const [btnLabel, setBtnLabel] = useState("Add")
    const [localQuantity, setLocalQuantity] = useState(1)

  return (
    <Card style={{ width: '18rem' }} className="d-flex flex-column m-2">
    <Card.Body>
        <div className="d-flex justify-content-between">
            <Card.Title>{props.title}</Card.Title>
            <Card.Text className="text-danger">{`Price: $${props.cost}`}</Card.Text>
        </div>
        <label className="text-black">Select quantity:</label>
        <input type="number"
               className="number-input border border-dark mx-2 mt-3"
               min="1"
               onChange={(e) => {
                                setLocalQuantity(e.target.value);
                                props.handleQuantityChange(props.productId, e.target.value);
                                props.orderListHandler(props.productId, e.target.value)}}/>
      <Button variant="dark"
              className="mt-5 card-btn"
              onClick={() => {setBtnLabel("Added!")}}>{btnLabel}</Button>
    </Card.Body>
  </Card>
  );
}
export default ProductCard;
