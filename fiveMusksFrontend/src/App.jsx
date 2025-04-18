import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import BuyerDashboard from './components/BuyerDashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import CreateOrder from './components/CreateOrder';
import ViewOrders from './components/ViewOrders';
import ViewOrderDetails from './components/ViewOrderDetails';
import UpdateOrder from './components/UpdateOrder';
import Checkout from './components/Checkout';
import './App.css'

function App() {
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [dashboardMsg, setDashboardMsg] = useState('')
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    let userEmail = localStorage.getItem('email')
    let userName = localStorage.getItem('name')
    let storedUserRole = localStorage.getItem('userRole')

    if (userEmail !== null) {
      setEmail(userEmail)
    }
    if (userName !== null) {
      setName(userName)
    }
    if (storedUserRole !== null) {
      setUserRole(storedUserRole)
    }
  }, [])

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage setEmail={setEmail} email={email} setName={setName} name={name} setUserRole={setUserRole} userRole={userRole} setDashboardMsg={setDashboardMsg} dashboardMsg={dashboardMsg}/>}></Route>
            <Route path="/buyerDashboard" element={<BuyerDashboard setUserRole={setUserRole} userRole={userRole} dashboardMsg={dashboardMsg} setEmail={setEmail} setName={setName} email={email}/>}></Route>
            <Route path="/createOrder" element={<CreateOrder setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>
            <Route path="/updateOrder/:orderId" element={<UpdateOrder setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>
            <Route path="/viewOrders" element={<ViewOrders setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>
            <Route path="/viewOrders/:id" element={<ViewOrderDetails setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>
            <Route path="/checkoutOrder/:orderId" element={<Checkout setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>

          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
