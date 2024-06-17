import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../slices/Students/thunk";
import CustomModal from "./customModal";
import { Link } from "react-router-dom";

function Read() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userDetail);
  const [id, setId] = useState("");
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2 className="text-center">Loading...</h2>;
  }
  if (users.length === 0) {
    return <h2 className="text-center">No users available.</h2>;
  }
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    alert("User deleted successfully");
  };

  return (
    <>
      {popup && <CustomModal id={id} popup={popup} setPopup={setPopup} />}
      <h2 className="text-center">All Data</h2>
      {users && users.length > 0 ? (
        users.map((ele) => (
          <div className="card w-50 mx-auto my-2" key={ele.id}>
            <div className="card-body">
              <h5 className="card-title">{ele.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
              <p className="card-subtitle mb-2 text-body-secondary">{ele.age}</p>
              <p className="card-subtitle mb-2 text-body-secondary">{ele.gender}</p>
              <button to="/read" className="card-link cursor-pointer border-0 bg-light text-primary" onClick={() => [setId(ele.id), setPopup(true)]}>
                View </button>
                 <Link to={`/edit/${ele.id}`} className="card-link ">
                Edit
              </Link>
              <Link onClick={() => handleDelete(ele.id)} className="card-link">
                Delete
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h2>No users available.</h2>
      )}
    </>
  );
}

export default Read;
