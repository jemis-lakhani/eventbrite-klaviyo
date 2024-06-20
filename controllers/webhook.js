let axios = require('axios');
const klaviyoApiKey = process.env.KLAVIYO_PRIVATE_API_KEY;

console.log(`DEBUG: :-------------: klaviyoApiKey :-------------:`, klaviyoApiKey)
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
        let eventData = await axiosRequest('GET', webhookData?.api_url);

        console.log(eventData, "------------- Data From Webhook Updated -------------");
        if (eventData?.config?.action === 'event.created') {


          const klaviyoEvent = {
            method: 'POST',
            url: 'https://a.klaviyo.com/api/events/',
            headers: {
              accept: 'application/json',
              revision: '2024-06-15',
              'content-type': 'application/json',
              Authorization: `Klaviyo-API-Key ${klaviyoApiKey}`
            },
            data: {
              data: {
                type: 'event',
                attributes: {
                  properties: {
                    name: eventData.name.text,
                    description: eventData.description.text,
                    url: eventData.url,
                    start: eventData.start.utc,
                    end: eventData.end.utc,
                    capacity: eventData.capacity,
                    status: eventData.status,
                    currency: eventData.currency,
                    is_free: eventData.is_free,
                    summary: eventData.summary,
                    source: eventData.source,
                  },
                  time: new Date().toISOString(), // Current time in ISO format
                  value: eventData.capacity,
                  value_currency: eventData.currency,
                  metric: { data: { type: 'metric', attributes: { name: 'Event Created' } } },
                  profile: {
                    data: {
                      type: 'profile',
                      attributes: {
                        organization_id: eventData.organization_id,
                        email: 'organizer@example.com' // Placeholder, replace with actual data if available
                      }
                    }
                  }
                }
                // attributes: {
                //   properties: {
                //     name: 'TEST EVENT DATA',
                //     description: 'lorem iosum domner',
                //     url: 'https://www.eventbrite.com/e/test-event-data-tickets-929038799057',
                //     start: '2024-07-30T04:30:00Z',
                //     end: '2024-07-30T06:30:00Z',
                //     capacity: 25,
                //     status: 'draft',
                //     currency: 'USD',
                //     is_free: true,
                //     summary: 'lorem iosum domner',
                //     source: 'coyote',
                //   },
                //   time: new Date().toISOString(), // Current time in ISO format
                //   value: 25,
                //   value_currency: 'USD',
                //   metric: { data: { type: 'metric', attributes: { name: 'Event Created' } } },
                //   profile: {
                //     data: {
                //       type: 'profile',
                //       attributes: {
                //         organization_id: '86629369253',
                //         email: 'organizer@example.com' // Placeholder, replace with actual data if available
                //       }
                //     }
                //   }
                // }
              }
            }
          };

          // Send data to Klaviyo
          const klaviyoResponse = await axios.request(klaviyoEvent);

          console.log(klaviyoResponse.data, "------------- Data Sent to Klaviyo -------------");
        }
        return response.OK({ res, message: 'Webhook Run Successfully', payload: data });

      } else {
        console.log("api_url not found");
        return response.NO_CONTENT_FOUND({ res });
      }

    } catch (error) {
      console.log(error, "error");
      return response.NO_CONTENT_FOUND({ res });

    }

  },



};
//* create event data from webhook
// event.created
// {
// name: { text: 'TEST EVENT DATA', html: 'TEST EVENT DATA' },
// description: { text: 'lorem iosum domner', html: 'lorem iosum domner' },
// url: 'https://www.eventbrite.com/e/test-event-data-tickets-929038799057',
// start: {
//   timezone: 'Asia/Kolkata',
//   local: '2024-07-30T10:00:00',
//   utc: '2024-07-30T04:30:00Z'
// },
// end: {
//   timezone: 'Asia/Kolkata',
//   local: '2024-07-30T12:00:00',
//   utc: '2024-07-30T06:30:00Z'
// },
// organization_id: '2191864153313',
// created: '2024-06-20T10:12:41Z',
// changed: '2024-06-20T10:12:42Z',
// capacity: 25,
// capacity_is_custom: true,
// status: 'draft',
// currency: 'USD',
// listed: true,
// shareable: false,
// invite_only: false,
// online_event: false,
// show_remaining: false,
// tx_time_limit: 1200,
// hide_start_date: false,
// hide_end_date: false,
// locale: 'en_US',
// is_locked: false,
// privacy_setting: 'unlocked',
// is_series: false,
// is_series_parent: false,
// inventory_type: 'limited',
// is_reserved_seating: false,
// show_pick_a_seat: false,
// show_seatmap_thumbnail: false,
// show_colors_in_seatmap_thumbnail: false,
// source: 'coyote',
// is_free: true,
// version: null,
// summary: 'lorem iosum domner',
// facebook_event_id: null,
// logo_id: null,
// organizer_id: '86629369253',
// venue_id: '219620919',
// category_id: null,
// subcategory_id: null,
// format_id: null,
// id: '929038799057',
// resource_uri: 'https://www.eventbriteapi.com/v3/events/929038799057/',
// is_externally_ticketed: false,
// logo: null

//* event.updated
// {
//   name: { text: 'TEST EVENT DATA', html: 'TEST EVENT DATA' },
//   description: { text: 'lorem iosum domner', html: 'lorem iosum domner' },
//   url: 'https://www.eventbrite.com/e/test-event-data-tickets-929038799057',
//   start: {
//     timezone: 'Asia/Kolkata',
//     local: '2024-07-30T10:00:00',
//     utc: '2024-07-30T04:30:00Z'
//   },
//   end: {
//     timezone: 'Asia/Kolkata',
//     local: '2024-07-30T12:00:00',
//     utc: '2024-07-30T06:30:00Z'
//   },
//   organization_id: '2191864153313',
//   created: '2024-06-20T10:12:41Z',
//   changed: '2024-06-20T10:12:42Z',
//   capacity: 25,
//   capacity_is_custom: true,
//   status: 'draft',
//   currency: 'USD',
//   listed: true,
//   shareable: false,
//   invite_only: false,
//   online_event: false,
//   show_remaining: false,
//   tx_time_limit: 1200,
//   hide_start_date: false,
//   hide_end_date: false,
//   locale: 'en_US',
//   is_locked: false,
//   privacy_setting: 'unlocked',
//   is_series: false,
//   is_series_parent: false,
//   inventory_type: 'limited',
//   is_reserved_seating: false,
//   show_pick_a_seat: false,
//   show_seatmap_thumbnail: false,
//   show_colors_in_seatmap_thumbnail: false,
//   source: 'coyote',
//   is_free: true,
//   version: null,
//   summary: 'lorem iosum domner',
//   facebook_event_id: null,
//   logo_id: null,
//   organizer_id: '86629369253',
//   venue_id: '219620919',
//   category_id: null,
//   subcategory_id: null,
//   format_id: null,
//   id: '929038799057',
//   resource_uri: 'https://www.eventbriteapi.com/v3/events/929038799057/',
//   is_externally_ticketed: false,
//   logo: null
// }
//*   ticket_class.updated

// {
//   actual_cost: null,
//   actual_fee: null,
//   cost: null,
//   fee: null,
//   tax: null,
//   resource_uri: 'https://www.eventbriteapi.com/v3/events/929038799057/ticket_classes/1566673769/',
//   display_name: 'General Admission',
//   name: 'General Admission',
//   description: null,
//   sorting: 1,
//   donation: false,
//   free: true,
//   minimum_quantity: 1,
//   maximum_quantity: 10,
//   maximum_quantity_per_order: 0,
//   on_sale_status: 'UNAVAILABLE',
//   has_pdf_ticket: true,
//   order_confirmation_message: null,
//   delivery_methods: [ 'electronic' ],
//   category: 'admission',
//   sales_channels: [ 'online', 'atd' ],
//   secondary_assignment_enabled: false,
//   event_id: '929038799057',
//   image_id: null,
//   id: '1566673769',
//   capacity: 500,
//   quantity_total: 500,
//   quantity_sold: 0,
//   sales_start: '2024-06-19T18:30:00Z',
//   sales_end: '2024-06-20T09:44:00Z',
//   sales_end_relative: null,
//   hidden: false,
//   hidden_currently: false,
//   include_fee: false,
//   split_fee: false,
//   hide_description: true,
//   hide_sale_dates: false,
//   ticket_parent_id: null,
//   auto_hide: false,
//   payment_constraints: []