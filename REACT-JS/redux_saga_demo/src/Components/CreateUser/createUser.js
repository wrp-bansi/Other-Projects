// CreateUser.js
import React from 'react';
import UserForm from '../Common/UserForm';
import { useDispatch } from 'react-redux';
import { addUser } from '../../Slices/Users/userSlice';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../helpers/api_helper';

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const submitUser = async ({ name, email }) => {
    try {

      const id = new Date().getTime();

      dispatch(addUser({ id, name, email }));

      await createUser({ id, name, email });

      console.log('User created successfully on the API');
       navigate('/');
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };
  return (
    <>
      <h3 style={{ textAlign:'center' }}>Add New User</h3>
      <UserForm initialValues={{}} onSubmit={ submitUser} />
    </>
  );
}

export default CreateUser;
