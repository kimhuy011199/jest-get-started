const axios = require('axios');

function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

const fetchData = async (id) => {
  const results = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  const { data } = results;
  // console.log(data);
  return data;
};

exports.sum = sum;
exports.subtract = subtract;
exports.fetchData = fetchData;
