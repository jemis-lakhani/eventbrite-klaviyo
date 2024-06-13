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
    webhookData = req.body;
    let apiUrl = webhookData.api_url.replace('{api-endpoint-to-fetch-object-details}', 'v3/events/{event_id}/');

    return res.send('Webhook Run Successfully');
  },
  attendeeUpdated: async (req, res) => {
    console.log(req.body, "body attendee.updated");
    //* only getting a userID in this webhook 
    webhookData = req.body;
    let data = await axiosRequest('GET', '/orders/9818771139/');

    console.log(data, "data");
    return res.send('Webhook Run Successfully');
  },

  orderUpdated: async (req, res) => {
    console.log(req.body, "body attendee.updated");
    //* only getting a userID in this webhook 
    webhookData = req.body;
    // need to add the order_Id or add path here
    let data = await axiosRequest('GET', '/orders/9818771139/');

    console.log(data, "data");
    return res.send('Webhook Run Successfully');
  },

};
