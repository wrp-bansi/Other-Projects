//addNumber
// function add(a, b) {
//   return a + b;
// }

// module.exports = {add};



// arrayUtils


// function sortArray(arr) {
//   return arr.sort((a, b) => a - b);
// }

// function findMax(arr) {
//   if (arr.length === 0) return undefined;
//   return Math.max(...arr);
// }

// function filterEven(arr) {
//   return arr.filter(num => num % 2 === 0);
// }

// module.exports = { sortArray, findMax, filterEven };

// //apiUtils


const axios = require('axios');

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

 module.exports = { fetchData };




