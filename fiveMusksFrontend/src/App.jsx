import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import BuyerDashboard from './components/BuyerDashboard';
import SellerDashboard from './components/SellerDashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import CreateOrder from './components/CreateOrder';
import ViewOrders from './components/ViewOrders';
import ViewOrderDetails from './components/ViewOrderDetails';
import UpdateOrder from './components/UpdateOrder';
import Checkout from './components/Checkout';
import SellerViewProducts from './components/SellerViewProducts';
import SellerViewOrders from './components/SellerViewOrders';
import SellerViewOrderDetails from './components/SellerViewOrderDetails';
import ProductStats from "./components/ProductStats";
import Dispatch from './components/Dispatch';
import Invoice from './Invoice';
import './App.css'
import InvoiceDetails from './components/InvoiceDetails';

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
            <Route path="/sellerDashboard" element={<SellerDashboard setUserRole={setUserRole} userRole={userRole} dashboardMsg={dashboardMsg} setEmail={setEmail} setName={setName} email={email}/>}></Route>
            <Route path="/sellerViewProducts" element={<SellerViewProducts setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>
            <Route path="/sellerViewOrders" element={<SellerViewOrders setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>
            <Route path="/viewSellerOrders/:id" element={<SellerViewOrderDetails setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>
            <Route path="/productStats/:productId" element={<ProductStats />} />
            <Route path="/dispatch" element={<Dispatch setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>
            <Route path="/invoiceDetails" element={<InvoiceDetails setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>
            <Route path="/invoice" element={<Invoice setUserRole={setUserRole} userRole={userRole} setEmail={setEmail} setName={setName} email={email}/>}> </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
