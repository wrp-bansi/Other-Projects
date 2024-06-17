import React, { useEffect, useState } from 'react';
import { useMutation} from '@apollo/client';
import { ADD_USER, UPDATE_USER } from '../graphql/mutations';


const AddRecord = ({ selectedUser, setSelectedUser }) => {
  const [createUser] = useMutation(ADD_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [name, setName] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
    } else {
      setName('');
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser) {
      await updateUser({
        variables: {
          id: selectedUser.id,
          name: name,
        },
      });
      setSelectedUser(null);
    } else {
      await createUser({
        variables: { name },
      });
    }
    setName('');
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">{selectedUser ? 'Update' : 'Add'} record</button>
    </form>
  </div>
  );
}

export default AddRecord;
