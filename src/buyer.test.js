import * as buyerController from '../controllers/buyerController.js';
import pool from '../db.js';
import {
  login,
  createOrder,
  updateOrder,
  deleteOrder,
  signout
} from '../controllers/buyerController.js';

const OK = 200;
const CREATED = 201;
const INPUT_ERROR = 400;
const INTERNAL_SERVER_ERROR = 500;

//======================BUYER UNIT TEST========================//

jest.mock('../db.js', () => ({
  query: jest.fn()
}));

jest.mock('../controllers/buyerController', () => ({
  ...jest.requireActual('../controllers/buyerController'),
  validEmail: jest.fn(),
  existingEmail: jest.fn(),
  validAddress: jest.fn(),
  existingOrderId: jest.fn(),
  existingProduct: jest.fn(),
  validQuantity: jest.fn(),
  validOrdersList: jest.fn()
}));

describe('POST /buyer/login', () => {
  describe('Success cases', () => {
    test('Successfully logs in a new user', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      buyerController.validEmail.mockReturnValue(true);
      buyerController.existingEmail.mockResolvedValue(false);

      const result = await login('newuser1@example.com');

      expect(result.code).toBe(OK);
      expect(result.message).toBe('Welcome new user!');
    });

    test('Successfully logs in an existing user', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      buyerController.validEmail.mockReturnValue(true);
      buyerController.existingEmail.mockResolvedValue(true);

      const result = await login('existinguser1@example.com');

      expect(result.code).toBe(OK);
      expect(result.message).toBe('Welcome back!');
    });
  });

  describe('Error cases', () => {
    test('Invalid email address', async () => {
      buyerController.validEmail.mockReturnValue(false);

      const result = await buyerController.login(null);

      expect(result.code).toBe(INPUT_ERROR);
      expect(result.message).toBe('Email is required.');
    });

    test('Internal Server Error', async () => {
      buyerController.validEmail.mockReturnValue(true);
      buyerController.existingEmail.mockRejectedValue(new Error('DB crash'));

      const result = await buyerController.login('user@example.com');

      expect(result.code).toBe(INTERNAL_SERVER_ERROR);
      expect(result.message).toBe('Internal server error');
    });
  });
});

describe('PUT /buyer/signout', () => {
  describe('Success cases', () => {
    test('Successfully signs out the user', async () => {
      buyerController.validEmail.mockReturnValue(true);
      buyerController.existingEmail.mockResolvedValue(true);
      pool.query.mockResolvedValueOnce({ rowCount: 1 });

      const result = await signout('user@example.com');

      expect(result.code).toBe(OK);
      expect(result.message).toBe('Logged out successfully.');
    });
  });

  describe('Error cases', () => {
    test('Invalid email address', async () => {
      buyerController.validEmail.mockReturnValue(false);

      const result = await buyerController.signout(null);

      expect(result.code).toBe(INPUT_ERROR);
      expect(result.message).toBe('Email is required.');
    });

    test('Internal Server Error', async () => {
      buyerController.validEmail.mockReturnValue(true);
      buyerController.existingEmail.mockResolvedValue(true);
      pool.query.mockRejectedValue(new Error('DB crash'));

      const result = await signout('user@example.com');

      expect(result.code).toBe(INTERNAL_SERVER_ERROR);
      expect(result.message).toBe('Internal server error');
    });
  });
});

describe('POST /buyer/createOrder', () => {
  describe('Success cases', () => {
    test('Successfully creates order', async () => {
      buyerController.existingEmail.mockResolvedValue(true);
      buyerController.validAddress.mockReturnValue(true);
      buyerController.validOrdersList.mockReturnValue(true);
      pool.query.mockResolvedValueOnce({ rows: [{ id: 101 }] });
      pool.query.mockResolvedValue({});

      const result = await createOrder('buyer@example.com', [{ productId: 1, productCost: 5, productQuantity: 2 }], '123 Street');

      expect(result.code).toBe(CREATED);
      expect(result.message).toMatch(/Order created successfully/);
    });
  });

  describe('Error cases', () => {
    test('Invalid delivery address', async () => {
      buyerController.existingEmail.mockResolvedValue(true);
      buyerController.validAddress.mockReturnValue(false);

      const result = await createOrder('buyer@example.com', [], null);

      expect(result.code).toBe(INPUT_ERROR);
      expect(result.message).toBe('Invalid delivery address');
    });

    test('Internal Server Error', async () => {
      buyerController.existingEmail.mockResolvedValue(true);
      buyerController.validAddress.mockReturnValue(true);
      buyerController.validOrdersList.mockReturnValue(true);
      pool.query.mockRejectedValue(new Error('DB error'));

      const result = await createOrder('buyer@example.com', [{ productId: 1 }], '123 Street');

      expect(result.code).toBe(INTERNAL_SERVER_ERROR);
      expect(result.message).toBe('Error creating order, please try again later.');
    });
  });
});

describe('PUT /buyer/updateOrder/{orderId}', () => {
  describe('Success cases', () => {
    test('Successfully updates order', async () => {
      buyerController.existingOrderId.mockResolvedValue(true);
      buyerController.validOrdersList.mockReturnValue(true);
      pool.query.mockResolvedValue({ rowCount: 1 });

      const result = await updateOrder([{ productId: 1, productCost: 5, productQuantity: 3 }], 1001);

      expect(result.code).toBe(CREATED);
      expect(result.message).toBe('Order updated successfully');
    });

    test('Can update order multiple times', async () => {
      buyerController.existingOrderId.mockResolvedValue(true);
      buyerController.validOrdersList.mockReturnValue(true);
      pool.query.mockResolvedValue({ rowCount: 1 });

      const result = await updateOrder([{ productId: 2, productCost: 4, productQuantity: 2 }], 1001);

      expect(result.code).toBe(CREATED);
    });
  });

  describe('Error cases', () => {
    test('Invalid orderId', async () => {
      buyerController.existingOrderId.mockResolvedValue(false);

      const result = await updateOrder([], null);

      expect(result.code).toBe(INPUT_ERROR);
      expect(result.message).toBe('Invalid order id');
    });

    test('Invalid product Id', async () => {
      buyerController.existingProduct.mockReturnValue(false);

      const result = await buyerController.deleteOrder({ orderId: 1002 });

      expect(result.code).toBe(INPUT_ERROR);
      expect(result.message).toBe('Invalid product Id');
    });

    test('Invalid product quantity', async () => {
      buyerController.validQuantity.mockReturnValue(false);

      const result = await updateOrder([{ productId: 1, productQuantity: -10 }], 1001);

      expect(result.code).toBe(INPUT_ERROR);
      expect(result.message).toBe('Invalid quantity');
    });

    test('Internal Server Error', async () => {
      buyerController.existingOrderId.mockResolvedValue(true);
      buyerController.validOrdersList.mockReturnValue(true);
      pool.query.mockRejectedValue(new Error('DB fail'));

      const result = await updateOrder([{ productId: 1, productCost: 5, productQuantity: 3 }], 1001);

      expect(result.code).toBe(INTERNAL_SERVER_ERROR);
      expect(result.message).toBe('Error updating order, please try again later.');
    });
  });
});

describe('DELETE /buyer/deleteOrder/{orderId}', () => {
  describe('Success cases', () => {
    test('Successfully deletes order', async () => {
      buyerController.existingOrderId.mockResolvedValue(true);
      pool.query.mockResolvedValue({ rowCount: 1 });

      const result = await deleteOrder(1001);

      expect(result.code).toBe(CREATED);
      expect(result.message).toBe('Order deleted successfully');
    });
  });

  describe('Error cases', () => {
    test('Invalid orderId', async () => {
      buyerController.existingOrderId.mockResolvedValue(false);

      const result = await deleteOrder(null);

      expect(result.code).toBe(INPUT_ERROR);
      expect(result.message).toBe('Invalid order id');
    });

    test('Internal Server Error', async () => {
      buyerController.existingOrderId.mockResolvedValue(true);
      pool.query.mockRejectedValue(new Error('DB error'));

      const result = await deleteOrder(1001);

      expect(result.code).toBe(INTERNAL_SERVER_ERROR);
      expect(result.message).toBe('Error deleting order, please try again later.');
    });
  });
});
 