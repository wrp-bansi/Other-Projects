

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './slidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');

    navigate('/');
  };
  return (

    <>
      <nav id="sidebarMenu"
        className="collapse d-lg-block  sidebar collapse  mt-3"
      >
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">

            <Link to="/tables" className="list-group-item list-group-item-action  py-2 ripple ">
              <i className="fas fa-home me-2 "></i> Home
            </Link>
            <Link to="/add" className="list-group-item list-group-item-action py-2 ripple">
              <i className="fas fa-plus me-2"></i> Add Product
            </Link>
            <Link to="/report" className="list-group-item list-group-item-action py-2 ripple ">
              <i className="fas fa-chart-bar me-2"></i> Report
            </Link>
            <Link to="/" className="list-group-item list-group-item-action py-2 ripple" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-2"></i> Logout
            </Link>

          </div>
        </div>
      </nav>
    </>

  );
};

export default Sidebar;


