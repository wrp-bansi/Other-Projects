import React from "react";
import "../components/customModal.css";
import { useSelector } from "react-redux";

function CustomModal({ id, popup, setPopup }) {
  const allusers = useSelector((state) => state.userDetail.users);
  const SingleUser = allusers.find((e) => e.id === id);

  return (
    <>
      {popup && (
        <div className="modalbackground">
          <div className="modelcontainer">
            <button  className="btn btn-primary mb-5" onClick={() => setPopup(false)}>close</button>
            <h6 className="card-title">{SingleUser.name}</h6>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {SingleUser.email}
            </h6>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {SingleUser.age}
            </h6>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {SingleUser.gender}
            </h6>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomModal;
