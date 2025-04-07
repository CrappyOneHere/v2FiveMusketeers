// ==============================BUYER FUNCTIONS=====================================

import { PutItemCommand, ScanCommand, UpdateItemCommand, GetItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const dynamodb_client = new DynamoDBClient({ region: "us-east-1" });

export async function login(event) {
  const email = event.email;

  if (!validEmail(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email is required" })
    };
  }

  const checkParams = {
    TableName: "customers",
    FilterExpression: "#e = :email",
    ExpressionAttributeNames: {
      "#e": "email"
    },
    ExpressionAttributeValues: {
      ":email": { S: email }
    }
  };

  try {
    const existing = await dynamodb_client.send(new ScanCommand(checkParams));
    if (existing.Items && existing.Items.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify("Welcome Back!")
      };
    }

    const params = {
      TableName: "customers",
      Item: marshall({
        email: email,
        active: true,
        orders: []
      })
    };

    await dynamodb_client.send(new PutItemCommand(params));

    return {
      statusCode: 201,
      body: JSON.stringify("User added successfully")
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to insert user", details: err.message })
    };
  }
}

export async function signout(event) {
  const email = event.email;

  if (!validEmail(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid Email." })
    };
  }

  try {
    const getParams = {
      TableName: "customers",
      Key: marshall({ email })
    };

    const result = await dynamodb_client.send(new GetItemCommand(getParams));
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Incorrect Email" })
      };
    }

    const updateParams = {
      TableName: "customers",
      Key: marshall({ email }),
      UpdateExpression: "SET active = :active",
      ExpressionAttributeValues: marshall({
        ":active": false
      })
    };

    await dynamodb_client.send(new UpdateItemCommand(updateParams));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Logout Successful" })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process request", details: err.message })
    };
  }
}

export async function createOrder(event, context) {
  const email = event.email;
  const orderList = event.orderList;
  const deliveryAddress = event.deliveryAddress;
  const orderId = context.awsRequestId + "orderId";

  if (!validEmail(email)) {
    return {
      statusCode: 400,
      body: 'Invalid email!'
    };
  }

  if (!validAddress(deliveryAddress)) {
    return {
      statusCode: 400,
      body: 'Invalid delivery address'
    };
  }

  if (!Array.isArray(orderList) || orderList.length === 0) {
    return {
      statusCode: 400,
      body: 'Invalid order list'
    };
  }

  try {
    const getUser = await dynamodb_client.send(new GetItemCommand({
      TableName: 'customers',
      Key: marshall({ email })
    }));

    if (!getUser.Item) {
      return {
        statusCode: 400,
        body: 'No customer found with the given email'
      };
    }

    const orderParams = {
      TableName: 'orderDetails',
      Item: marshall({
        id: orderId,
        email,
        orderList,
        deliveryAddress,
        totalCost: 0,
        date: new Date().toISOString(),
        status: 'CREATED',
        orderConfirmation: false
      })
    };

    await dynamodb_client.send(new PutItemCommand(orderParams));

    const updateCustomer = {
      TableName: 'customers',
      Key: marshall({ email }),
      UpdateExpression: 'SET orders = list_append(if_not_exists(orders, :emptyList), :order)',
      ExpressionAttributeValues: marshall({
        ':order': [orderId],
        ':emptyList': []
      })
    };

    await dynamodb_client.send(new UpdateItemCommand(updateCustomer));

    return {
      statusCode: 201,
      body: 'Order created successfully'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error creating order, please try again later.'
    };
  }
}

export async function deleteOrder(event) {
  const email = event.email;
  const orderId = event.orderId;

  if (!email || !orderId) {
    return {
      statusCode: 400,
      body: 'Missing fields'
    };
  }

  try {
    const removeOrder = {
      TableName: 'orderDetails',
      Key: marshall({ id: orderId })
    };

    await dynamodb_client.send(new DeleteItemCommand(removeOrder));

    const getCustomer = await dynamodb_client.send(new GetItemCommand({
      TableName: 'customers',
      Key: marshall({ email })
    }));

    const customer = unmarshall(getCustomer.Item);
    const updatedOrders = (customer.orders || []).filter(id => id !== orderId);

    const updateCustomer = {
      TableName: 'customers',
      Key: marshall({ email }),
      UpdateExpression: 'SET orders = :newOrders',
      ExpressionAttributeValues: marshall({
        ':newOrders': updatedOrders
      })
    };

    await dynamodb_client.send(new UpdateItemCommand(updateCustomer));

    return {
      statusCode: 200,
      body: 'Order deleted'
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Error deleting order, please try again later.'
    };
  }
}

function validEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email && emailRegex.test(email);
}

function validAddress(address) {
  return address && address.trim().length > 0;
}