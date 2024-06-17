// UserUpdate.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../slices/Students/thunk";
import UserForm from "./userForm";

function UserUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("ID from URL:", id);
  const [update, setUpdate] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const users = useSelector((state) => state.userDetail.users);

  useEffect(() => {
    console.log("ID:", id);
    if (id) {
      const singleUser = users.find((e) => e.id === parseInt(id));
      console.log("Single User:", singleUser);

      if (singleUser) {
        setUpdate({
          name: singleUser.name,
          email: singleUser.email,
          age: singleUser.age,
          gender: singleUser.gender,
        });
      } else {
        console.log(`User with ID ${id} not found`);
      }
    }
  }, [id, users]);

  const handleUpdateUser = (userData) => {
    const updatedUserData = {
      ...userData,
      id: id, // Assuming id is available from the useParams
    };
    dispatch(updateUser(updatedUserData));
    navigate("/read");
    alert("User updated successfully");
  };

  return (
    <>
      <h2 className="my-2 text-center">Update the data</h2>
      <UserForm initialData={update} onSubmit={handleUpdateUser} />
    </>
  );
}

export default UserUpdate;
