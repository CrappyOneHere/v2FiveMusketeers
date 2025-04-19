import Sidebar from "./Sidebar";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from "axios";

import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

function Checkout(props) {
    const {orderId} =  useParams()
    const [addressLine, setAddressLine] = useState('Unit 5B');
    const [buildingName, setBuildingName] = useState('Leafy PLaza');
    const [buildingNumber, setBuildingNumber] = useState(12);
    const [streetName, setStreetName] = useState('Lettuce Rd');
    const [cityName, setCityName] = useState('Vegetable');
    const [countrySubentity, setCountrySubentity] = useState('NSW');
    const [zip, setZip] = useState(2020);
    const [country, setCountry] = useState('AU');
    const [validated, setValidated] = useState(false);
    const [xmlResponse, setXmlResponse] = useState(null);

    const checkoutOrderApi = async() => {
        try {
            const response = await axios.post(`https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/buyer/checkout?orderId=${orderId}`, {
                address: {
                    addressLine: addressLine,
                    buildingName: buildingName,
                    buildingNumber: buildingNumber,
                    streetName: streetName,
                    cityName: cityName,
                    countrySubentity: countrySubentity,
                    postalZone: zip,
                    country: country
                }
            },
                {
                    headers: {
                        email: props.email,
                    }
                }
            )
            setXmlResponse(response.data)
            // console.log("response", response)
        } catch (err) {
            console.log("Error:", err)
        }
    }
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
      checkoutOrderApi()
      event.preventDefault();
    };
    const memoSidebar = useMemo(() => {
        return (
            <Sidebar
            setUserRole={props.setUserRole}
            userRole={props.userRole}
            setEmail={props.setEmail}
            setName={props.setName}
            email={props.email} />
        )}, [props.setUserRole, props.userRole, props.setEmail, props.setName, props.email])
    return (
        <>

            {/* <div className="flex-ratio-col1">
               {memoSidebar}
            </div> */}

            <div className="flex-wrap align-items-center justify-content-center">
                <h1 className="text-white mt-3 mb-5 pb-5 center-page">Checkout order</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="text-white mx-5">
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Address line:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Unit 5B"
                            onChange={(e) => setAddressLine(e.target.value)}
                            value={addressLine}
                            // defaultValue=""
                        />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Building name:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Leafy plaza"
                            onChange={(e) => setBuildingName(e.target.value)}
                            value={buildingName}
                            // defaultValue="Otto"
                        />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Building number:</Form.Label>
                        <Form.Control type="text"
                                      placeholder="12"
                                      required
                                      onChange={(e) => setBuildingNumber((e.target.value).toString())}
                                      value={buildingNumber}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid building number.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Street name</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Lettuce rd"
                                      required
                                      onChange={(e) => setStreetName(e.target.value)}
                                      value={streetName}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid street name.
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>City name</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Vegetable"
                                      required
                                      onChange={(e) => setCityName(e.target.value)}
                                      value={cityName}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city name.
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="validationCustom06">
                        <Form.Label>Country subentity</Form.Label>
                        <Form.Control type="text"
                                      placeholder="NSW"
                                      required
                                      onChange={(e) => setCountrySubentity(e.target.value)}
                                      value={countrySubentity}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid country subentity.
                        </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group as={Col} md="3" controlId="validationCustom07">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Zip"
                                      required
                                      onChange={(e) => setZip((e.target.value).toString())} 
                                      value={zip}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="validationCustom08">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text"
                                      placeholder="AU"
                                      required
                                      onChange={(e) => setCountry(e.target.value)}
                                      value={country}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid country name.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button className="btn-danger" type="submit">Checkout order</Button>
                </Form>
            </div>

            {xmlResponse !== null &&
                <div className="text-black mx-5 mt-3 bg-light p-3 rounded">
                    <h4 className="text-black my-5 center-page">UBL document:</h4>
                    {xmlResponse}
                </div>}
   </>
  );
}
export default Checkout;