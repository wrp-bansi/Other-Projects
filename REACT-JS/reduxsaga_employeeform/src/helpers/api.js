// helpers/api.js
export const fetchUsersApi = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const createUserApi = async ({ name, email }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      // Check if the API call was successful
      if (response.ok) {
        return response.json();
      } else {
        const errorData = await response.json();
        throw new Error(`API error: ${response.statusText}, ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  };

  // Similarly, you can create functions for updating and deleting users.
  // Example:
  export const updateUserApi = async (id, { name, email }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${response.statusText}, ${errorData.message}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw error;
    }
  };

  export const deleteUserApi = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${response.statusText}, ${errorData.message}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw error;
    }
  };
