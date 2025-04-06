import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Createorder from './components/Createorder'
import Updateorders from './components/Updateorders'
import Vieworders from './components/Vieworders'
import Invoice from './components/Invoice'
import Viewinvoices from './components/Viewinvoices'
import Dispatch from './components/Dispatch'
import Viewdispatches from './components/Viewdispatches'
import Viewordersplaced from './components/Viewordersplaced'
import Orderplaced from './components/Orderplaced'
import Viewproducts from './components/Viewproducts'
import Addproduct from './components/Addproduct';
import Rejectorder from './components/Rejectorder';
import Customerdetails from './components/Cutomerdetails';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Createorder />} />
          <Route path='/updateOrders' element={<Updateorders />} />
          <Route path='/viewOrders' element={<Vieworders />} />
          <Route path='/viewInvoices' element={<Viewinvoices />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/viewDispatches' element={<Viewdispatches />} />
          <Route path='/dispatch' element={<Dispatch />} />
          <Route path='/ordersPlaced' element={<Viewordersplaced />} />
          <Route path='/orderPlacedByCustomer' element={<Orderplaced />} />
          <Route path='/viewProducts' element={<Viewproducts />} />
          <Route path='/addProduct' element={<Addproduct />} />
          <Route path='/rejectOrder' element={<Rejectorder />} />
          <Route path='/customerDetails' element={<Customerdetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
