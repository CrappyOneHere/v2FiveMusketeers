import { ScanCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const getSellerOrders = async (event, context) => {
  const dynamodb_client = new DynamoDBClient({ region: "us-east-1" });
  const sellerId = event.pathParameters?.sellerId || event.sellerId;

  if (!sellerId) {
    return {
      statusCode: 400,
      body: JSON.stringify("Missing sellerId"),
    };
  }

  const params = {
    TableName: "orders",
    FilterExpression: "#s = :sellerId",
    ExpressionAttributeNames: {
      "#s": "sellerId",
    },
    ExpressionAttributeValues: {
      ":sellerId": { S: sellerId },
    },
  };

  try {
    const result = await dynamodb_client.send(new ScanCommand(params));
    const orders = result.Items.map(item => unmarshall(item));

    if (orders.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify("No orders found for this seller."),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(orders),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error",
        details: err.message,
      }),
    };
  }
  

};

