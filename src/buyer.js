import checkEmail from './helper.js';

// do we need aws-sdk? middle-ware stack?

// installed npm install @aws-sdk/client-dynamodb
// installed npm install aws-sdk-mock --save-dev
// installed npm install @aws-sdk/util-dynamodb

// Mocks the commands and its outputs --> is this not enough black box?
// installed npm install --save-dev aws-sdk-client-mock 

import { PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
 
export const buyerLogin = async (event, context) => {
  const dynamdb_client = new DynamoDBClient({ region: "us-east-1" });

  const email = event.email;

  // Check validity of the email
  if (!checkEmail(email)) {
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
      ":email": { S: email}
    }
  };
 
  try {
    const existing = await dynamdb_client.send(new ScanCommand(checkParams));
    if (existing.Items && existing.Items.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify("Welcome Back!"),
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
 
    await dynamdb_client.send(new PutItemCommand(params));
 
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
};
