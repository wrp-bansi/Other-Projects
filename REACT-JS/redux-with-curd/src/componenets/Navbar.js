import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Navbar() {
  const allusers = useSelector((state) => state.app.users)


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h4 className="navbar-brand" href="#">
            RTK
          </h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page" >
                  Create post
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/read" className="nav-link">
                  All post({allusers.length})
                </Link>
              </li>


            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}
export default Navbar