let axios = require('axios');
//*import the axios helper
const { axiosInstance, axiosRequest } = require('../helpers/axios.helper');
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
    console.log(req.body, "body");

    //* only getting a userID in this webhook 
    let webhookData = req.body;
    console.log(webhookData, "webhook");
    return res.send('Webhook Run Successfully');
  },

  attendeeUpdated: async (req, res) => {
    let webhookData = req.body;
    console.log(webhookData, "body attendee.updated");

    if (webhookData.api_url.includes('https://www.eventbriteapi.com/v3')) {
      let api_url = webhookData.api_url?.split("https://www.eventbriteapi.com/v3");
      let data = await axiosRequest('GET', api_url[1]);

      console.log(data, "------------- Data From Attendes Updated-------------");
    } else {
      console.log("api_url not found");
    }

    return res.send({ message: 'Webhook Run Successfully', data });
  },

  orderUpdated: async (req, res) => {
    let webhookData = req.body;
    console.log(webhookData, "body attendee.updated");

    if (webhookData.api_url.includes('https://www.eventbriteapi.com/v3')) {
      let api_url = webhookData.api_url?.split("https://www.eventbriteapi.com/v3");
      let data = await axiosRequest('GET', api_url[1]);

      console.log(data, "data attendes updated");
    } else {
      console.log("api_url not found");
    }

    return res.send('Webhook Run Successfully');
  },

};
