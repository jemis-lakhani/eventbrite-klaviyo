// create axios common function 
let axios = require('axios');

 const axiosInstance = axios.create({
  baseURL: 'https://www.eventbriteapi.com/v3',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + 'W37UY2HZTVGZDY7E6YFP',
  },
});

exports.axiosRequest = async (method, url, data) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
// create axios common function

