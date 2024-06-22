let { KLAVIYO_METRIC } = require("../constants/klaviyo");
let axios = require("axios");

exports.placeOrder = async (eventBriteData) => {
  try {
    console.log("***********************************eventBriteData");

    /**
     * Create an event in Klaviyo with the following properties:
     * data.attributes: {
     * time: created time received from Eventbrite,
     * value: gross price paid by user,
     * value_currency: currency of the event,
     * properties:{
     *      ● Event ID:
     *      ● Event Name:
     *      ● PromoCode:
     *      ● Ticket Type:
     *      ● Ticket Quantity:
     *      ● Check In Status:
     *      ● Order ID:
     *  },
     * metric: {
     *     data: {
     *      attributes: {
     *         name: KLAVIYO_METRIC.ORDER_PLACED
     *    },
     *  },
     * profile: {
     *    data: {
     *          attributes: {
     *              first_name: first name of the user,
     *              last_name: last name of the user,
     *              phone_number: phone number of the user,
     *              email: email of the user,
     *              // other user related properties if received from Eventbrite
     *         }
     *     }
     *  }
     * }
     */
    let klaviyoEvent = JSON.stringify({
      data: {
        type: "event",
        "attributes": {
          "time": eventBriteData?.created,
          "value": eventBriteData?.costs?.gross?.value,
          "value_currency": eventBriteData?.costs?.gross?.currency,
          "properties": {
            "event_id": eventBriteData?.event_id,
            "event_name": eventBriteData?.name,
            "promo_code": eventBriteData?.promo_code,
            "ticket_type": eventBriteData?.ticket_type,
            "ticket_quantity": eventBriteData?.ticket_quantity,
            "check_in_status": eventBriteData?.status,
            "order_id": eventBriteData?.id,
          },

          metric: { data: { type: 'metric', attributes: { name: KLAVIYO_METRIC.ORDER_PLACED } } },

          "profile": {
            "data": {
              "type": "profile",
              "attributes": {
                "first_name": eventBriteData?.first_name,
                "last_name": eventBriteData?.last_name,
                "phone_number": eventBriteData?.phone,
                "email": eventBriteData?.email
              }
            }
          }
        }
      }
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://a.klaviyo.com/api/events/',
      headers: {
        'Authorization': 'Klaviyo-API-Key pk_33ddce92bbaa7eac409f174f4d08ee94a1',
        'accept': 'application/json',
        'content-type': 'application/json',
        'revision': '2024-06-15'
      },
      data: klaviyoEvent
    };

  let val =  await axios.request(config)
  console.log(val, "val");
    // Use KLAVIYO_METRIC constatnt for different kind of events

    return "Order placed successfully";
  } catch (error) {
    console.log(error, "error");
  }
};

exports.updateOrder = async (eventBriteData) => { };

exports.createEvent = async (eventData) => {
  let klaviyoEvent = JSON.stringify({
    data: {
      type: "event",
      "attributes": {
        "properties": {
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
        "time": eventData.created,
        value: eventData.capacity,
        value_currency: eventData.currency,
        metric: { data: { type: 'metric', attributes: { name: 'Event Created' } } },

        "profile": {
          "data": {
            "type": "profile",
            "attributes": {
              "organization": eventData.organization_id,
              "image": eventData.logo,
              "email": "organizer@example.com"
            }
          }
        }
      }
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://a.klaviyo.com/api/events/',
    headers: {
      'Authorization': 'Klaviyo-API-Key pk_33ddce92bbaa7eac409f174f4d08ee94a1',
      'accept': 'application/json',
      'content-type': 'application/json',
      'revision': '2024-06-15'
    },
    data: klaviyoEvent
  };

  await axios.request(config)
  return "Event Created successfully";

 };

// Interested Properties:
// ● Event ID:
// ● Event Name:
// ● PromoCode:
// ● Ticket Type:
// ● Ticket Quantity:
// ● Check In Status:

// ● Email:
// ● First name:
// ● Last name:
// ● Phone#:
// ● Order ID:
// ● Order Total:
