const axios = require('axios');

const book = require("./book");

const baseURL = 'http://localhost:3003';
    
const api = axios.create({
  baseURL,
  validateStatus: status => true,
})

book.test(api);