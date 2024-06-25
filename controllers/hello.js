const response = require('../helpers/api.response.helper');

module.exports = {
  hello: async (req, res) => {
    try {
      let testData = req.body;
      console.log(testData, "testData");

        return response.OK({ res, message: 'Hello from POST', payload: testData });

    } catch (error) {
      console.log(error, "error");
    }
  },
};
