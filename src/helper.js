/**
 * Helper function that helps to check if the email is valid 
 * @param {*} email 
 * @returns boolean true or false 
 */
export default function checkEmail (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (email === '' || !(emailRegex.test(email)) || email === null || email === undefined) {
      return false;
    }
    return true ;
  }



import { create } from 'xmlbuilder2';

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
  
  const xml = generateOrderXML({
    id: 'ORDER123',
    email: 'customer@example.com',
    orderList: [
      { name: 'Widget A', description: 'Standard widget', quantity: 2, price: 50, lineCost: 100, unitCode: 'EA' },
      { name: 'Widget B', description: 'Custom widget', quantity: 1, price: 75, lineCost: 75, unitCode: 'EA' }
    ],
    deliveryAddress: {
      street: '123 Main St',
      buildingName: 'HQ',
      buildingNumber: '56A',
      city: 'London',
      postalCode: 'W1A 1AA',
      region: 'Greater London',
      line: 'Suite 400',
      countryCode: 'GB'
    },
    totalCost: 175,
    date: new Date().toISOString().split('T')[0],
    status: 'CREATED',
    orderConfirmation: false
  });
  
  console.log(xml);
  