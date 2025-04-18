import Card from 'react-bootstrap/Card';

function ProductOrderedCard(props) {
  console.log(props)
  return (
    <Card style={{ width: '18rem' }} className="m-2">
    <Card.Body>
      <div className="d-flex justify-content-between">
        <Card.Title>{props.title}</Card.Title>
        <p className="text-danger">{`Price: $${props.cost}`}</p>
      </div>
      <Card.Text>{`Quantity: ${props.quantity}`}</Card.Text>
    </Card.Body>
  </Card>
  );
}
export default ProductOrderedCard;