import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function LoginPage(props) {
    const [role, setRole] = useState('')
    const [dropdownText, setDropdownText] = useState('Role')
    const nav = useNavigate()

    const loginFn = async() => {
        try {
            const response = await axios.post("https://mus5kuz5j9.execute-api.us-east-1.amazonaws.com/v1/login", {
              email: props.email,
              role: role,
              name: props.name
            })
            if (response.data.statusCode === 200 || response.data.statusCode === 201) {
              props.setDashboardMsg(JSON.parse(response.data.body))
              localStorage.setItem('email', props.email)
              localStorage.setItem('name', props.name)
              localStorage.setItem('userRole', role)
              nav('/buyerDashboard')
            } else {
              alert(`Error: ${JSON.parse(response.data.body).error}`)
            }
        } catch (err) {
            alert("Error:", err)
        }
    }

  return (
    <>
    <NavBar/>
    <h1 className="text-white mx-5 mt-5 px-5"> Login </h1>
    <Form className="m-5 p-5">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className ="text-white">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={e => props.setEmail(e.target.value)}/>
        <Form.Text className="text-info">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicname">
        <Form.Label className ="text-white">Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={e => props.setName(e.target.value)}/>
      </Form.Group>

    <p className="text-white">Select you role:</p>
    <Dropdown>
      <Dropdown.Toggle variant="light" className = "mb-5" id="dropdown-basic">
        {dropdownText}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={ () => {setRole("buyer"); setDropdownText("buyer")}}>buyer</Dropdown.Item>
        <Dropdown.Item onClick={ () => {setRole("seller"); setDropdownText("seller")}}>seller</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

      <Button variant="info"
              disabled={props.email === "" || role === ''}
              onClick= {
                (e) => {e.preventDefault()
                    if (role === "buyer") {
                        loginFn()
                    }
              }}>
        Submit
      </Button>
    </Form>
    </>
  );
}

export default LoginPage;