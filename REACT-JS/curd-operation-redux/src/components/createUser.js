import React from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../slices/Students/thunk";
import { useNavigate } from "react-router-dom";
import UserForm from "./userForm";

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateUser = (userData) => {
    console.log('Request Payload:', userData);
    dispatch(createUser(userData))
      .then((response) => {
        console.log('User created successfully:', response);
        navigate("/read");
        alert("User created successfully");
      })
      .catch((error) => {

      });
  };

  return (
    <>
      <h2 className="my-2 text-center">Fill the data</h2>
      <UserForm onSubmit={handleCreateUser} />
    </>
  );
}

export default CreateUser;
