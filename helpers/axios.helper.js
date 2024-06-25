let axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.EVENTBBRITE_API_TOKEN,
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
};
