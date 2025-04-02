// lambda_function.test.js
import { buyerLogin } from './buyer.js';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBClient, ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

const invalidEmail = 'yo-yo';
const validEmail = 'test@example.com';
const ddbMock = mockClient(DynamoDBClient);

describe('buyerLogin function', () => {
    beforeEach(() => {
      // Reset the mock client before each test
      ddbMock.reset();
    });

    // success case 
    it('Welcome user if email exist in the database', async () => {
        // Mock the ScanCommand to simulate an existing user
        ddbMock.on(ScanCommand).resolves({
            Items: [{ email: { S: validEmail }, active: { BOOL: true }, orders: { L: [] } }]
        });

        // Define an event
        const event = { email: validEmail };
        // Define a mock context
        const context = {};

        // Call the Lambda function
        const response = await buyerLogin(event, context);

        // Check if the response status code is correct
        expect(response.statusCode).toBe(200);
        // Check if the response body is correct
        expect(response.body).toEqual(expect.any(String));
    });

    // Failed case with invalid email address
    it('should return error upon invalid email address', async () => {
        // Define the test event
        const event = { email: invalidEmail };

        // Define a mock context 
        const context = {};
        // Call the Lambda function
        const response = await buyerLogin(event, context);

        // Check if the response status code is correct
        expect(response.statusCode).toBe(400);
        // Check if the response body is correct
        expect(response.body).toEqual(expect.any(String));
    });

    // A new user is added 
    it('should add a new user and return success message', async () => {
        // Mock the ScanCommand to stimulate no existing user 
        ddbMock.on(ScanCommand).resolves({
            Items: []
        });

        // Mock the PutItemCommand to simulate successful insertion
        ddbMock.on(PutItemCommand).resolves({});

        // Define the test event
        const event = { email: validEmail };
        // Define a mock context 
        const context = {};

        // Call the Lambda function
        const response = await buyerLogin(event, context);

        // Check if the response status code is correct
        expect(response.statusCode).toBe(201);
        // Check if the response body is correct
        expect(response.body).toEqual(expect.any(String));
    });
});

