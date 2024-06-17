// App.js
import React from 'react';
import ShowUsrs from './Components/ShowUsers/showUsers'; // Adjust the import path if needed
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateUser from './Components/CreateUser/createUser'; // Adjust the import path if needed
import UpdateUser from './Components/UpdateUser/updateUser'; // Adjust the import path if needed

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowUsrs />} />
          <Route path='/create' element={<CreateUser />} />
          <Route path='/edit/:id' element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
