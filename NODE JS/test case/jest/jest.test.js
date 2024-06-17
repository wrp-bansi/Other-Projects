 //first twst case
// const { add } = require('../src/fuction');

// test('adds 1 + 2 to equal 3', () => {
//   expect(add(1, 2)).toBe(3);
// });

// test('adds 0 + 0 to equal 0', () => {
//   expect(add(0, 0)).toBe(0);
// });

// test('adds -1 + 1 to equal 0', () => {
//   expect(add(-1, 1)).toBe(0);
// });

//second test case
//  const { sortArray, findMax, filterEven } = require('../src/fuction');


// describe('Array Utils', () => {
//   describe('sortArray', () => {
//     test('sorts an array of numbers in ascending order', () => {
//       const input = [3, 1, 4, 2, 5];
//       const expected = [1, 2, 3, 4, 5];
//       expect(sortArray(input)).toEqual(expected);
//     });
//   });

//   describe('findMax', () => {
//     test('returns the maximum element in an array', () => {
//       const input = [3, 7, 2, 8, 5];
//       const expected = 8;
//       expect(findMax(input)).toEqual(expected);
//     });

//     test('returns undefined for an empty array', () => {
//       const input = [];
//       const expected = undefined;
//       expect(findMax(input)).toEqual(expected);
//     });
//   });

//   describe('filterEven', () => {
//     test('filters out even numbers from an array', () => {
//       const input = [1, 2, 3, 4, 5, 6];
//       const expected = [2, 4, 6];
//       expect(filterEven(input)).toEqual(expected);
//     });

//     test('returns an empty array if no even numbers are present', () => {
//       const input = [1, 3, 5];
//       const expected = [];
//       expect(filterEven(input)).toEqual(expected);
//     });
//   });
// });


// apiUtils

// const { fetchData } = require('../src/fuction');

// describe('API Utils', () => {
//   test('fetches data from a valid URL', async () => {
//     const url = 'https://jsonplaceholder.typico.com/posts/1';
//     const data = await fetchData(url);
//     expect(data).toHaveProperty('userId');
//     expect(data).toHaveProperty('id');
//     expect(data).toHaveProperty('title');
//     expect(data).toHaveProperty('body');
//   });

//   test('handles errors when fetching data from an invalid URL', async () => {
//     const url = 'https://jsonplaceholder.typicode.com/invalid-url';
//     await expect(fetchData(url)).rejects.toThrow('Error fetching data');
//   });

//   test('handles empty response', async () => {
//     const url = 'https://jsonplaceholder.typicode.com/posts/1000';
//     await expect(fetchData(url)).rejects.toThrow('Error fetching data: Request failed with status code 404');
//   });

// });


// userUtils test

 const { createUser, authenticateUser, deleteUser } = require('../src/jest');

describe('User Utils', () => {
  // Test case for createUser function
  describe('createUser', () => {
    test('creates a new user with valid input', () => {
      const user = createUser('john_doe', 'password123');
      expect(user).toEqual({ username: 'john_doe', password: 'password123' });
    });

    test('throws an error for empty username', () => {
      expect(() => {
        createUser('', 'password123');
      }).toThrow('Username cannot be empty');
    });

    test('throws an error for weak password', () => {
      expect(() => {
        createUser('john_doe', '123');
      }).toThrow('Password must be at least 6 characters long');
    });
  });

  // Test case for authenticateUser function
  describe('authenticateUser', () => {
    test('authenticates user with correct credentials', () => {
      const user = { username: 'john_doe', password: 'password123' };
      const isAuthenticated = authenticateUser(user, 'password1');
      expect(isAuthenticated).toBe(true);
    });

    test('fails to authenticate user with incorrect password', () => {
      const user = { username: 'john_doe', password: 'password123' };
      const isAuthenticated = authenticateUser(user, 'wrong_password');
      expect(isAuthenticated).toBe(false);
    });

    test('fails to authenticate non-existing user', () => {
      const user = null;
      const isAuthenticated = authenticateUser(user, 'password123');
      expect(isAuthenticated).toBe(false);
    });
  });

  // Test case for deleteUser function
  describe('deleteUser', () => {
    test('deletes an existing user', () => {
      const users = [
        { username: 'john_doe', password: 'password123' },
        { username: 'jane_doe', password: 'password456' },
      ];
      const updatedUsers = deleteUser(users, 'john_doe');
      expect(updatedUsers).toHaveLength(1);
      expect(updatedUsers).not.toContainEqual({ username: 'john_doe', password: 'password123' });
    });

    test('throws an error when trying to delete non-existing user', () => {
      const users = [
        { username: 'john_doe', password: 'password123' },
        { username: 'jane_doe', password: 'password456' },
      ];
      expect(() => {
        deleteUser(users, 'non_existing_user');
      }).toThrow('User not found');
    });
  });
});




// const { updateUser } = require('../src/jest');

// describe('User Utils', () => {
//   // Test case for updateUser function
//   describe('updateUser', () => {
//     test('updates an existing user with valid input', () => {
//       const users = [
//         { username: 'john_doe', password: 'password123' },
//         { username: 'jane_doe', password: 'password456' },
//       ];

//       const updatedUsers = updateUser(users, 'john_doe', 'new_password123');

//       expect(updatedUsers).toHaveLength(2);
//       expect(updatedUsers).toContainEqual({ username: 'john_doe', password: 'new_password123' });
//     });

//     test('throws an error when trying to update non-existing user', () => {
//       const users = [
//         { username: 'john_doe', password: 'password123' },
//         { username: 'jane_doe', password: 'password456' },
//       ];

//       expect(() => {
//         updateUser(users, 'non_existing_user', 'new_password123');
//       }).toThrow('User not found');
//     });

//     test('throws an error for weak new password', () => {
//       const users = [
//         { username: 'john_doe', password: 'password123' },
//         { username: 'jane_doe', password: 'password456' },
//       ];

//       expect(() => {
//         updateUser(users, 'john_doe', '123');
//       }).toThrow('New password must be at least 6 characters long');
//     });
//   });
// });
