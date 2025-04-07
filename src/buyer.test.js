import {
    login,
    signout,
    createOrder,
    deleteOrder,
  } from './buyer.js';
  
  import {
    DynamoDBClient,
    ScanCommand,
    PutItemCommand,
    UpdateItemCommand,
    GetItemCommand,
    DeleteItemCommand,
  } from '@aws-sdk/client-dynamodb';
  
  import { mockClient } from 'aws-sdk-client-mock';
  import { marshall } from '@aws-sdk/util-dynamodb';
  
  const dynamoMock = mockClient(DynamoDBClient);
  
  beforeEach(() => {
    dynamoMock.reset();
  });
  
  describe('login function', () => {
    test('should welcome back an existing user', async () => {
      dynamoMock.on(ScanCommand).resolves({
        Items: [{ email: { S: 'test@example.com' } }]
      });
  
      const result = await login({ email: 'test@example.com' });
  
      expect(result.statusCode).toBe(200);
      expect(result.body).toContain('Welcome Back');
    });
  
    test('should register new user if email not found', async () => {
      dynamoMock.on(ScanCommand).resolves({ Items: [] });
      dynamoMock.on(PutItemCommand).resolves({});
  
      const result = await login({ email: 'new@example.com' });
  
      expect(result.statusCode).toBe(201);
      expect(result.body).toContain('User added successfully');
    });
  
    test('should return 400 for invalid email', async () => {
      const result = await login({ email: '' });
  
      expect(result.statusCode).toBe(400);
    });
  
    test('should return 500 for DB error', async () => {
      dynamoMock.on(ScanCommand).rejects(new Error('DB fail'));
  
      const result = await login({ email: 'fail@example.com' });
  
      expect(result.statusCode).toBe(500);
    });
  });
  
  describe('signout function', () => {
    test('should logout successfully', async () => {
      dynamoMock.on(GetItemCommand).resolves({
        Item: marshall({ email: 'user@example.com' })
      });
      dynamoMock.on(UpdateItemCommand).resolves({});
  
      const result = await signout({ email: 'user@example.com' });
  
      expect(result.statusCode).toBe(200);
      expect(result.body).toContain('Logout Successful');
    });
  
    test('should return 404 if user not found', async () => {
      dynamoMock.on(GetItemCommand).resolves({});
  
      const result = await signout({ email: 'nouser@example.com' });
  
      expect(result.statusCode).toBe(404);
    });
  
    test('should return 400 for invalid email', async () => {
      const result = await signout({ email: '' });
  
      expect(result.statusCode).toBe(400);
    });
  
    test('should return 500 on DB error', async () => {
      dynamoMock.on(GetItemCommand).rejects(new Error('boom'));
  
      const result = await signout({ email: 'fail@example.com' });
  
      expect(result.statusCode).toBe(500);
    });
  });
  
  describe('createOrder function', () => {
    test('should return 400 for invalid email', async () => {
      const result = await createOrder({ email: '', orderList: [], deliveryAddress: '' }, { awsRequestId: 'abc' });
      expect(result.statusCode).toBe(400);
    });
  
    test('should return 400 if buyer not found', async () => {
      dynamoMock.on(GetItemCommand).resolves({});
  
      const result = await createOrder({
        email: 'unknown@example.com',
        orderList: [{ productId: '123', quantity: 1 }],
        deliveryAddress: '123 Street'
      }, { awsRequestId: 'xyz' });
  
      expect(result.statusCode).toBe(400);
    });
  
    test('should create order successfully', async () => {
      const productItem = marshall({
        id: '123',
        stockRemaining: 10,
        cost: 5
      });
  
      dynamoMock
        .on(GetItemCommand)
        .resolvesOnce({ Item: marshall({ email: 'test@example.com' }) }) // Check user
        .resolvesOnce({ Item: productItem }) // Check product
        .resolvesOnce({ Item: productItem }); // Cost lookup
      dynamoMock.on(PutItemCommand).resolves({});
      dynamoMock.on(UpdateItemCommand).resolves({});
  
      const result = await createOrder({
        email: 'test@example.com',
        orderList: [{ productId: '123', quantity: 1 }],
        deliveryAddress: '456 Ave'
      }, { awsRequestId: 'req123' });
  
      expect(result.statusCode).toBe(201);
      expect(result.body).toContain('Order created successfully');
    });
  });
  
  describe('deleteOrder function', () => {
    test('should delete order successfully', async () => {
      dynamoMock.on(DeleteItemCommand).resolves({});
      dynamoMock.on(GetItemCommand).resolves({
        Item: marshall({ email: 'user@example.com', orders: ['order1'] })
      });
      dynamoMock.on(UpdateItemCommand).resolves({});
  
      const result = await deleteOrder({ email: 'user@example.com', orderId: 'order1' });
  
      expect(result.statusCode).toBe(200);
      expect(result.body).toContain('Order deleted');
    });
  
    test('should return 400 for missing fields', async () => {
      const result = await deleteOrder({ email: '', orderId: '' });
  
      expect(result.statusCode).toBe(400);
    });
  
    test('should return 500 on DB error', async () => {
      dynamoMock.on(DeleteItemCommand).rejects(new Error('fail'));
  
      const result = await deleteOrder({ email: 'x', orderId: 'y' });
  
      expect(result.statusCode).toBe(500);
    });
  });
  