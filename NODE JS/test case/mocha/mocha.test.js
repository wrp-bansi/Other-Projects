// mocha.test.js

require('@babel/register');

const { expect } = require('chai');
const { createUser, authenticateUser, deleteUser } = require('../src/jest');



describe('User Utils', () => {
  // Test case for createUser function
  describe('createUser', () => {
    it('creates a new user with valid input', () => {
      const user = createUser('john_doe', 'password123');
      expect(user).to.deep.equal({ username: 'john_doe', password: 'password123' });
    });

    it('throws an error for empty username', () => {
      expect(() => {
        createUser('', 'password123');
      }).to.throw('Username cannot be empty');
    });

    it('throws an error for weak password', () => {
      expect(() => {
        createUser('john_doe', '123');
      }).to.throw('Password must be at least 6 characters long');
    });
  });

  // Test case for authenticateUser function
  describe('authenticateUser', () => {
    it('authenticates user with correct credentials', () => {
      const user = { username: 'john_doe', password: 'password123' };
      const isAuthenticated = authenticateUser(user, 'password123');
      expect(isAuthenticated).to.be.true;
    });

    it('fails to authenticate user with incorrect password', () => {
      const user = { username: 'john_doe', password: 'password123' };
      const isAuthenticated = authenticateUser(user, 'wrong_password');
      expect(isAuthenticated).to.be.false;
    });

    it('fails to authenticate non-existing user', () => {
      const user = null;
      const isAuthenticated = authenticateUser(user, 'password123');
      expect(isAuthenticated).to.be.false;
    });
  });

  // Test case for deleteUser function
  describe('deleteUser', () => {
    it('deletes an existing user', () => {
      const users = [
        { username: 'john_doe', password: 'password123' },
        { username: 'jane_doe', password: 'password456' },
      ];
      const updatedUsers = deleteUser(users, 'john_doe');
      expect(updatedUsers).to.have.lengthOf(1);
      expect(updatedUsers).to.not.deep.include({ username: 'john_doe', password: 'password123' });
    });

    it('throws an error when trying to delete non-existing user', () => {
      const users = [
        { username: 'john_doe', password: 'password123' },
        { username: 'jane_doe', password: 'password456' },
      ];
      expect(() => {
        deleteUser(users, 'non_existing_user');
      }).to.throw('User not found');
    });
  });
});
