// lambda_function.test.js
import  { buyerLogin } from './buyer.js';

const invalidEmail = 'yo-yo';

describe('Login Function Tests', () => {
    it('should return error upon invalid email address', async () => {
        // Define the test event
        const event = {
            email: invalidEmail
        };

        // Define a mock context (it can be any object, here we keep it simple)
        const context = {};

        // Call the Lambda function
        const response = await buyerLogin(event, context);

        // Check if the response status code is correct
        expect(response.statusCode).toBe(400);

        // Check if the response body is correct
        expect(response.body).toEqual(expect.any(String));
    });
});
