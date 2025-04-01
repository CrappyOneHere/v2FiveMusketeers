import checkEmail from './helper.js';

const invalidEmail = 'invalid123';
const invalidEmail2 = 'user+name@example.com'
const validEmail = 'hello@gmail.com';

describe('checkEmail function', () => {
    // Test valid Emailemail
    test('should return true for a valid email', () => {
        const result = checkEmail(validEmail);
        expect(result).toBe(true);
    });

    // Test invalid email with incorrect format
    test('should return false for an invalid email (missing @)', () => {
        const result = checkEmail(invalidEmail);
        expect(result).toBe(false);
    });

    // Test invalid email with invalid domain
    test('should return false for an invalid email (incorrect domain)', () => {
        const result = checkEmail('example@com');
        expect(result).toBe(false);
    });

    // Test empty string
    test('should return false for an empty email string', () => {
        const result = checkEmail('');
        expect(result).toBe(false);
    });

    // Test null value
    test('should return false for a null email', () => {
        const result = checkEmail(null);
        expect(result).toBe(false);
    });

    // Test undefined value
    test('should return false for an undefined email', () => {
        const result = checkEmail(undefined);
        expect(result).toBe(false);
    });

    // Test valid email with special characters
    test('should return true for a valid email with special characters', () => {
        const result = checkEmail(invalidEmail2);
        expect(result).toBe(true);
    });
});