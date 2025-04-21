import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function SellerOrderCard(props) {
    const nav = useNavigate();
    return (
        <Card
            style={{
                width: '20rem',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                wordWrap: 'break-word'
            }}
            className='m-3'
        >
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div style={{ maxWidth: '75%' }}>
                        <Card.Title className="mb-1" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                            🧾 Order {props.index} ID
                        </Card.Title>
                        <Card.Text className="text-muted" style={{ fontSize: '0.9rem', wordBreak: 'break-word' }}>
                            {props.orderId}
                        </Card.Text>
                    </div>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        className="ms-2 mt-1"
                        onClick={() => nav(`/viewSellerOrders/${props.orderId}`)}
                    >
                        View
                    </Button>
                </div>

                <hr className="my-2" />

                <div className="mb-2 text-muted" style={{ fontSize: '0.85rem', wordBreak: 'break-word' }}>
                    Email: 
                    <a href={`mailto:${props.buyerEmail}`} style={{ textDecoration: 'none' }}>
                        <strong>{props.buyerEmail}</strong>
                    </a>
                </div>

                <div className="mb-2 text-muted" style={{ fontSize: '0.85rem' }}>
                    Created on: <strong>{props.dateCreated}</strong>
                </div>

                <div
                    className="fw-bold"
                    style={{ color: props.orderConfirmed ? 'green' : '#ff911c', fontSize: '0.9rem' }}
                >
                    {props.orderConfirmed ? '✅ Order Confirmed' : '⏳ Awaiting Confirmation'}
                </div>
            </Card.Body>
        </Card>
    );
}

export default SellerOrderCard;
