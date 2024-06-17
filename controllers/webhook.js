let axios = require('axios');
//*import the axios helper
const { axiosInstance, axiosRequest } = require('../helpers/axios.helper');
const response = require('../helpers/api.response.helper');
//* write a function here
// module.exports = (req, res) => {
//   console.log(`DEBUG: :-------------: req.body :-------------:`, req.body)
//   const { name = 'World' } = req.query;
//   console.log(`DEBUG: :-------------: name :-------------:`, name)
//   res.status(200).send(`Hellow, ${name}!`);
// };
//* write a a code for api
module.exports = {
  webhook: async (req, res) => {
    try {
      let webhookData = req.body;
      console.log(webhookData, "webhook");

      if (webhookData?.api_url && webhookData.api_url.includes('https://www.eventbriteapi.com/v3')) {
        let api_url = webhookData.api_url?.split("https://www.eventbriteapi.com/v3");
        let data = await axiosRequest('GET', webhookData?.api_url);

        console.log(data, "------------- Data From Webhhok Updated-------------");
        return response.OK({ res, message: 'Webhook Run Successfully', payload: data });

      } else {
        console.log("api_url not found");
        return response.NO_CONTENT_FOUND({ res, message: 'api_url not found', payload: null });
      }

    } catch (error) {
      console.log(error, "error");
    }

  },



};
