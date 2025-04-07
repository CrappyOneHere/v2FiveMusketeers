import { ScanCommand, PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// ==================== GET SELLER ORDERS ====================
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

// ==================== VIEW USERS ====================
export const viewUsers = async (event) => {
  const dynamdb_client = new DynamoDBClient({ region: "us-east-1" });

  const params = {
    TableName: "customers"
  };

  try {
    const data = await dynamdb_client.send(new ScanCommand(params));
    if (!data.Items || data.Items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify("No Users")
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items.map(item => unmarshall(item)))
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch users", details: err.message })
    };
  }
};

// ==================== VIEW PRODUCTS ====================
export const viewProducts = async (event, context) => {
  const dynamdb_client = new DynamoDBClient({ region: "us-east-1" });

  const params = {
    TableName: "products"
  };

  try {
    const data = await dynamdb_client.send(new ScanCommand(params));
    if (!data.Items || data.Items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify("No registered products")
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items.map(item => unmarshall(item)))
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch products", details: error.message })
    };
  }
};

// ==================== ADD PRODUCT ====================
export const addProduct = async (event, context) => {
  const dynamdb_client = new DynamoDBClient({ region: "us-east-1" });

  const name = event.name;
  const cost = event.cost;
  const stockRemaining = event.stockRemaining;
  const id = context.awsRequestId;

  const params = {
    TableName: "products",
    Item: marshall({
      id,
      name,
      cost,
      stockRemaining
    })
  };

  try {
    const data = await dynamdb_client.send(new PutItemCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Product added successfully", data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to add product", details: error.message })
    };
  }
};
