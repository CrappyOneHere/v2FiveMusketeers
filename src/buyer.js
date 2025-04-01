import checkEmail from './helper.js';

// do we need aws-sdk?

export const buyerLogin = async (event, context) => {
  const email = event.email;

  // Check validity of hte email
  if (!checkEmail(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email is required" })
    };
  }

  // Return the response
  return {
      statusCode: 200,
      body: `The sum is: ${result}`
  };

};

// import { PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
 
// export const handler = async (event) => {
//   const dynamdb_client = new DynamoDBClient({ region: "us-east-1" });
 
//   const checkParams = {
//     TableName: "customers",
//     FilterExpression: "#e = :email",
//     ExpressionAttributeNames: {
//       "#e": "email"
//     },
//     ExpressionAttributeValues: {
//       ":email": { S: email}
//     }
//   };
 
//   try {
//     const existing = await dynamdb_client.send(new ScanCommand(checkParams));
//     if (existing.Items && existing.Items.length > 0) {
//       return {
//         statusCode: 200,
//         body: JSON.stringify("Welcome Back!"),
//       };
//     }
 
//     const params = {
//       TableName: "customers",
//       Item: marshall({
//         email: email,
//         active: true,
//         orders: []
//       })
//     };
 
//     await dynamdb_client.send(new PutItemCommand(params));
 
//     return {
//       statusCode: 201,
//       body: JSON.stringify("User added successfully")
//     };
//   } catch (err) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Failed to insert user", details: err.message })
//     };
//   }
// };


