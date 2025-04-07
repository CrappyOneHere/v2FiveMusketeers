import checkEmail from './helper.js';
import { create } from 'xmlbuilder2';

// do we need aws-sdk? middle-ware stack?

// installed npm install @aws-sdk/client-dynamodb
// installed npm install aws-sdk-mock --save-dev
// installed npm install @aws-sdk/util-dynamodb

// Mocks the commands and its outputs --> is this not enough black box?
// installed npm install --save-dev aws-sdk-client-mock 

import { PutItemCommand, ScanCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

/**
 * converts order detail into ubl document 
 * @param {*} event 
 * @param {*} context 
 * @returns 
 */
export const UBLgenerator = async (event, context) => {
  const dynamdb_client = new DynamoDBClient({ region: "us-east-1" });

  const orderId = event.queryStringParameters?.orderid; 
  return await helperUBLgenerator(orderId);
}

export async function helperUBLgenerator(orderId) {
  // Check if the id field is field out
  if (!orderId) {
    return {
      statusCode: 400,
      body: JSON.stringify("The order Id is requied")
    };
  }

  const params = {
    TableName: "orderDetails", 
    Key: {
      id: { S: orderId },
    },
  };

  try {
    const data = await dynamdb_client.send(new GetItemCommand(params));
    if (!data.Item) {
      return {
        statusCode: 400,
        body: JSON.stringify("The order Id does not exist")
      };
    }

    // Unmarshall the DynamoDB response to get a normal JavaScript object
    const item = unmarshall(data.Item);

    // Convert DynamoDB format to usable JSON
    const deliveryAddress = JSON.parse(item.deliveryAddress || '{}');
    const orderList = item.ordersList?.map((orderItem, index) => ({
      name: orderItem.productId,
      description: "", // add if needed
      quantity: parseInt(orderItem.productQuantity || "0"),
      unitCode: "EA",
      price: 0, // add if needed
      lineCost: 0, // or price * quantity
    })) || [];

    const xml = generateOrderXML({
      id: item.id,
      email: "email@domain.com", // replace or store email in the DB
      orderList,
      deliveryAddress,
      totalCost: parseFloat(item.totalCost),
      date: item.date,
      status: item.status,
      orderConfirmation: item.orderConfirmation,
    });

    return {
      statusCode: 200,
      body: xml,
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch items", details: err.message })
    }
  }
}

function generateOrderXML({
  id,
  email,
  orderList,
  deliveryAddress,
  totalCost,
  date,
  status,
  orderConfirmation
}) {
  const doc = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('Order', {
      xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Order-2',
      'xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
      'xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2'
    })
    .ele('cbc:UBLVersionID').txt('2.0').up()
    .ele('cbc:CustomizationID').txt('urn:oasis:names:specification:ubl:xpath:Order-2.0:sbs-1.0-draft').up()
    .ele('cbc:ProfileID').txt('bpid:urn:oasis:names:draft:bpss:ubl-2-sbs-order-with-simple-response-draft').up()
    .ele('cbc:ID').txt(id).up()
    .ele('cbc:CopyIndicator').txt(orderConfirmation).up()
    .ele('cbc:IssueDate').txt(date).up()
    .ele('cbc:Note').txt(status).up()

    .ele('cac:BuyerCustomerParty')
      .ele('cac:Party')
        .ele('cac:Contact')
          .ele('cbc:ElectronicMail').txt(email).up()
        .up()
      .up()
    .up()

    .ele('cac:Delivery')
      .ele('cac:DeliveryAddress')
        .ele('cbc:StreetName').txt(deliveryAddress.street || '').up()
        .ele('cbc:BuildingName').txt(deliveryAddress.buildingName || '').up()
        .ele('cbc:BuildingNumber').txt(deliveryAddress.buildingNumber || '').up()
        .ele('cbc:CityName').txt(deliveryAddress.city || '').up()
        .ele('cbc:PostalZone').txt(deliveryAddress.postalCode || '').up()
        .ele('cbc:CountrySubentity').txt(deliveryAddress.region || '').up()
        .ele('cac:AddressLine')
          .ele('cbc:Line').txt(deliveryAddress.line || '').up()
        .up()
        .ele('cac:Country')
          .ele('cbc:IdentificationCode').txt(deliveryAddress.countryCode || 'GB').up()
        .up()
      .up()
    .up()

    .ele('cac:AnticipatedMonetaryTotal')
      .ele('cbc:PayableAmount', { currencyID: 'GBP' }).txt(totalCost.toFixed(2)).up()
    .up();

  // Add order lines
  for (let i = 0; i < orderList.length; i++) {
    const item = orderList[i];
    doc
      .ele('cac:OrderLine')
        .ele('cac:LineItem')
          .ele('cbc:ID').txt(i + 1).up()
          .ele('cbc:Quantity', { unitCode: item.unitCode || 'EA' }).txt(item.quantity).up()
          .ele('cbc:LineExtensionAmount', { currencyID: 'GBP' }).txt(item.lineCost.toFixed(2)).up()
          .ele('cac:Item')
            .ele('cbc:Name').txt(item.name).up()
            .ele('cbc:Description').txt(item.description || '').up()
          .up()
          .ele('cac:Price')
            .ele('cbc:PriceAmount', { currencyID: 'GBP' }).txt(item.price.toFixed(2)).up()
            .ele('cbc:BaseQuantity', { unitCode: item.unitCode || 'EA' }).txt('1').up()
          .up()
        .up()
      .up();
  }

  return doc.end({ prettyPrint: true });
}

/**
 * buyer logs in with email
 * @param {*} event 
 * @param {*} context 
 * @returns 
 */
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
