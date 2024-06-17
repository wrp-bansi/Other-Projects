


import React, { useState } from 'react';
import './Navbar.css';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ setSearchQuery,searchQuery }) => {

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');

    navigate('/');
  };
  const [isCollapsed, setIsCollapsed] = useState(true);



  return (
<nav id="main-navbar" className="navbar navbar-expand-lg navbar-light navbgcolor fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <img
            src="data:image/jpeg;base64,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"
            height={55}
            alt="MDB Logo"
            loading="lazy"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className="fas fa-bars" />
        </button>
        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto d-lg-none">
            <li className="nav-item">
              <Link to="/tables" className="nav-link">
                <i className="fas fa-home me-2"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                <i className="fas fa-plus me-2"></i> Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/report" className="nav-link">
                <i className="fas fa-chart-bar me-2"></i> Report
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i> Logout
              </Link>
            </li>
          </ul>
          <form className="d-none d-md-flex input-group w-auto my-auto">
          <input
              className="form-control "
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              style={{ minWidth: 225 }}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span className="input-group-text border-0">
              <i className="fas fa-search" />
            </span>
          </form>
          <div className="navbar-nav ms-auto d-flex flex-row align-items-center">
            <div className="nav-item dropdown">
            <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                className="rounded-circle"
                height={30}
                alt="Avatar"
                loading="lazy"
              />
            </a>

          </li>
            </div>
          </div>
        </div>
      </div>
    </nav>





  );
};
Navbar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired, // setSearchQuery prop is a required function
  searchQuery: PropTypes.string.isRequired, // searchQuery prop is a required string
};
export default Navbar;

