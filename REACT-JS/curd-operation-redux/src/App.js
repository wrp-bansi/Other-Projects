import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateUser from './components/createUser';
// import Read from './components/read';
import UserUpdate from './components/userUpdate';
import Navbar from './components/navbar';
import Read from "./components/Read";

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

