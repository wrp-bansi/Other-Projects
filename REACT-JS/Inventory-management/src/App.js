import React from 'react';
import './App.css';
import InventoryTable from './pages/Inventory-Table/table';
import UserLoginForm from './pages/UserLoginpage/userLoginForm';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AddProductForm from './Components/AddProductForm/addProductForm';
import EditProductForm from './Components/EditproductsForm/editProductForm';
import ReportPage from './pages/UserLoginpage/Report/report';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLoginForm />}></Route>
          <Route path="tables" element={<InventoryTable />} />
          <Route path="/add" element={<AddProductForm />} />
          <Route path="/edit/:id" element={<EditProductForm />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
