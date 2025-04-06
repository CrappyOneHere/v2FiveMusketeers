import {
  getSellerOrders,
  viewUsers,
  viewProducts,
  addProduct
} from './seller.js';

import { mockClient } from 'aws-sdk-client-mock';
import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand
} from '@aws-sdk/client-dynamodb';

const ddbMock = mockClient(DynamoDBClient);
const validSellerId = 'seller123';
const invalidSellerId = 'no_seller';

beforeEach(() => {
  ddbMock.reset();
});

describe('getSellerOrders Lambda Function', () => {
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
    ddbMock.on(ScanCommand).rejects(new Error('DynamoDB down'));

    const event = { pathParameters: { sellerId: validSellerId } };
    const response = await getSellerOrders(event, {});

    expect(response.statusCode).toBe(500);
    expect(response.body).toContain('Internal server error');
  });
});

describe('viewUsers Lambda Function', () => {
  it('returns 200 with list of users', async () => {
    ddbMock.on(ScanCommand).resolves({
      Items: [
        { email: { S: 'user1@example.com' } },
        { email: { S: 'user2@example.com' } }
      ]
    });

    const event = {};
    const response = await viewUsers(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).length).toBe(2);
  });

  it('returns 400 if no users found', async () => {
    ddbMock.on(ScanCommand).resolves({ Items: [] });

    const response = await viewUsers({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toContain('No Users');
  });

  it('returns 500 on DB error', async () => {
    ddbMock.on(ScanCommand).rejects(new Error('Failed to fetch users'));

    const response = await viewUsers({});
    expect(response.statusCode).toBe(500);
    expect(response.body).toContain('Failed to fetch users');
  });
});


describe('viewProducts Lambda Function', () => {
  it('returns 200 with list of products', async () => {
    ddbMock.on(ScanCommand).resolves({
      Items: [
        { id: { S: 'prod1' }, name: { S: 'Book' } },
        { id: { S: 'prod2' }, name: { S: 'Pen' } }
      ]
    });

    const response = await viewProducts({}, {});
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).length).toBe(2);
  });

  it('returns 400 if no products found', async () => {
    ddbMock.on(ScanCommand).resolves({ Items: [] });

    const response = await viewProducts({}, {});
    expect(response.statusCode).toBe(400);
    expect(response.body).toContain('No registered products');
  });

  it('returns 500 on DB error', async () => {
    ddbMock.on(ScanCommand).rejects(new Error('DB failure'));

    const response = await viewProducts({}, {});
    expect(response.statusCode).toBe(500);
    expect(response.body).toContain('Failed to fetch products');
  });
});


describe('addProduct Lambda Function', () => {
  it('returns 200 when product is added', async () => {
    ddbMock.on(PutItemCommand).resolves({});

    const event = {
      name: 'Notebook',
      cost: 10,
      stockRemaining: 50
    };
    const context = { awsRequestId: 'product123' };

    const response = await addProduct(event, context);
    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('Product added successfully');
  });

  it('returns 500 on DB error', async () => {
    ddbMock.on(PutItemCommand).rejects(new Error('Add failed'));

    const event = {
      name: 'Notebook',
      cost: 10,
      stockRemaining: 50
    };
    const context = { awsRequestId: 'product123' };

    const response = await addProduct(event, context);
    expect(response.statusCode).toBe(500);
    expect(response.body).toContain('Failed to add product');
  });
});
