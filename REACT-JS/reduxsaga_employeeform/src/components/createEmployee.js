// CreateUser.js
import React from 'react';
import UserForm from './Common/UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Slices/user/employeeSlices';
import { useNavigate } from 'react-router-dom';
import { createUserApi } from '../helpers/api';

function CreateUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  // const handleSubmit = ({ name, email }) => {
  //   dispatch(addUser({ id: users[users.length - 1].id + 1, name, email }));
  //   navigate('/');
  // };
  const handleSubmit = async ({ name, email }) => {
    try {
      // Create a unique ID for the new user (you can use any method)
      const id = new Date().getTime();

      // Dispatch the addUser action to update the Redux store
      dispatch(addUser({ id, name, email }));

      // Make the API call to create the new user
      await createUserApi({ id, name, email });

      console.log('User created successfully on the API');
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };
  return (
    <>
      <h3>Add New User</h3>
      <UserForm initialValues={{}} onSubmit={handleSubmit} />
    </>
  );
}

export default CreateUser;
