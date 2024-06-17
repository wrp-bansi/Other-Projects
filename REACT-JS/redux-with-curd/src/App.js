// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateUser from './componenets/CreateUser';
import Read from './componenets/Read';
import UserUpdate from './componenets/userupdate';
import Navbar from './componenets/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/read" element={<Read />} />
        <Route path="/edit/:id" element={<UserUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
