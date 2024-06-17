// UpdateUser.js
import React from 'react';
import UserForm from './Common/UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../Slices/user/employeeSlices';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const exitsingleuser = users.filter((user) => user.id == id);
  const { name, email } = exitsingleuser[0] || {};
  const navigate = useNavigate();

  const handleSubmit = ({ name, email }) => {
    dispatch(updateUser({ id, name, email }));
    navigate('/');
  };

  return (
    <>
      <h3>Update User</h3>
      <UserForm initialValues={{ name, email }} onSubmit={handleSubmit} />
    </>
  );
}

export default UpdateUser;
