import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';
import AddRecord from './AddRecord';


function GetRecords() {
  const { data, loading, error } = useQuery(GET_USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUpdate = (user) => {
    setSelectedUser(user);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className=''>
    <div className='row'>
    <div className='col-6'>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.id} - {user.name}
            <button onClick={() => handleUpdate(user)}>Update</button>
            {/* <DeleteButton userId={user.id} /> */}
          </li>
        ))}
      </ul>
      <div className='col-6'>
      <AddRecord selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
    </div>
    </div>
  );
}

export default GetRecords;
