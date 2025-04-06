
import { getSellerOrders } from './seller.js';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';

const ddbMock = mockClient(DynamoDBClient);
const validSellerId = 'seller123';
const invalidSellerId = 'not_found_999';

describe('getSellerOrders Lambda Function', () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it('returns 200 and list of orders for a valid seller ID', async () => {
    ddbMock.on(ScanCommand).resolves({
      Items: [
        { orderId: { S: 'order001' }, sellerId: { S: validSellerId }, product: { S: 'Book' } },
        { orderId: { S: 'order002' }, sellerId: { S: validSellerId }, product: { S: 'Pen' } }
      ]
    });

    const event = { pathParameters: { sellerId: validSellerId } };
    const response = await getSellerOrders(event, {});
    
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).length).toBe(2);
  });

  it('returns 404 if no orders found for the seller ID', async () => {
    ddbMock.on(ScanCommand).resolves({ Items: [] });

    const event = { pathParameters: { sellerId: invalidSellerId } };
    const response = await getSellerOrders(event, {});

    expect(response.statusCode).toBe(404);
    expect(response.body).toContain('No orders found');
  });

  it('returns 400 if seller ID is missing', async () => {
    const event = { pathParameters: {} };
    const response = await getSellerOrders(event, {});

    expect(response.statusCode).toBe(400);
    expect(response.body).toContain('Missing sellerId');
  });

  it('returns 500 on unexpected DynamoDB error', async () => {
    ddbMock.on(ScanCommand).rejects(new Error('DynamoDB is down'));

    const event = { pathParameters: { sellerId: validSellerId } };
    const response = await getSellerOrders(event, {});

    expect(response.statusCode).toBe(500);
    expect(response.body).toContain('Internal server error');
  });
});
