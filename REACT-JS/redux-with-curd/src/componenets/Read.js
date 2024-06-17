import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../featchers/userDeatailSlice";
import Custommodal from "./custommodal";
import { Link } from "react-router-dom";


function Read() {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.app);
    const [id,setId]=useState("")
    const [popup,setPopup]=useState(false)

    useEffect(() => {
      dispatch(showUser());
    }, [dispatch]);

    if (loading) {
      return <h2>Loading...</h2>;
    }
     return (
      <>
      {popup && <Custommodal id={id} popup={popup} setPopup={setPopup} /> }
        <h2>All Data</h2>
        {users.map((ele) => (
  <div className="card w-50 mx-auto my-2" key={ele.id}>
    <div className="card-body">
      <h5 className="card-title">{ele.name}</h5>
      <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
      <p className="card-subtitle mb-2 text-body-secondary">{ele.age}</p>
      <p className="card-subtitle mb-2 text-body-secondary">{ele.gender}</p>
      <a  to="/read" className="card-link" onClick={() => [setId(ele.id), setPopup(true)]}>
      View
    </a>
      <Link to={`/edit/${ele.id}`} className="card-link">
      Edit
    </Link>
    <Link  onClick={() => dispatch(deleteUser(ele.id))} className="card-link">
      Delete
    </Link>

    </div>
  </div>
))}
      </>
    );
  }

export default Read