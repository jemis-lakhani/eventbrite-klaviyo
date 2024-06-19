// create axios common function 
let axios = require('axios');

 const axiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer W37UY2HZTVGZDY7E6YFP',
    // 'Authorization': 'Bearer ' + process.env.EVENTBBRITE_API_TOKEN,
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

