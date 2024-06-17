//userUtils.js

function createUser(username, password) {
    if (!username) {
      throw new Error('Username cannot be empty');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    return { username, password };
  }

  function authenticateUser(user, password) {
    if (!user) {
      return false;
    }

    return user.password === password;
  }

  function deleteUser(users, usernameToDelete) {
    const index = users.findIndex(user => user.username === usernameToDelete);
    if (index === -1) {
      throw new Error('User not found');
    }

    users.splice(index, 1);
    return users;
  }

  function updateUser(users, usernameToUpdate, newPassword) {
    const index = users.findIndex(user => user.username === usernameToUpdate);
    if (index === -1) {
        throw new Error('User not found');
    }

    if (newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long');
    }

    users[index].password = newPassword;
    return users;
}

module.exports = { createUser, authenticateUser, deleteUser, updateUser };

