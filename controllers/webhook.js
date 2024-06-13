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
  // get: async (req, res) => {
  //     let { search } = req.query;

  //     const data = {
  //         isEmail: false,
  //         isDomain: false,
  //         avatar: null,
  //         companyName: null,

  //     };

  //     search = search ? search.replace(/ /g,'').toLowerCase() : search;
  //     console.log(`DEBUG: :-------------: search :-------------:`, search);

  //     if (REGEXP.EMAIL.test(search)) {
  //         data.isEmail = true;
  //         data.avatar = getGravatar({ email: search, size: 100 });
  //     } else if (REGEXP.DOMAIN.test(search)) {
  //         data.isDomain = true;
  //         data.avatar = getCompanyLogo({ domain: search });
  //         data.companyName = await getCompany({ domain: search });
  //     }
  //     data.query = search;
  //     console.log(`DEBUG: :-------------: data :-------------:`, data);
  //     return res.render('avatars', {
  //         pageTitle: 'Avatars',
  //         profile: data,

  //     });
  // },
};
