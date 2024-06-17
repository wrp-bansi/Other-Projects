// UpdateUser.js
import React from 'react';
import UserForm from '../Common/UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Slices/Users/userSlice';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const users = useSelector((state) => state.users.data);
  const exitsingleuser = users.find((user) => user.id === Number(id)) || {};
  const { name, email } = exitsingleuser;
  const navigate = useNavigate();

  const SubmitUpdateUser = ({ name, email }) => {
    dispatch(updateUser({ id: Number(id), name, email }));

    navigate('/');
  }

  return (
    <>
      <h3 style={{ textAlign:'center' }}>Update User</h3>
      <UserForm initialValues={{ name, email }} onSubmit={SubmitUpdateUser} />
    </>
  );
}

export default UpdateUser;
