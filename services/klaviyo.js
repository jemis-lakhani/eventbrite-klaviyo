// integrate klaviyo
const axios = require('axios');
const response = require('../helpers/api.response.helper');
const { axiosRequest } = require('../helpers/axios.helper');

// write function for klaviyo request 
const klaviyoRequest = async (method, webhook, data) => {
  try {
    const response = await axiosRequest(method, url, data);
    return response;
  } catch (error) {
    return error;
  }
}