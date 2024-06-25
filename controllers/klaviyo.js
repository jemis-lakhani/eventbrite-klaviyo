let { KLAVIYO_METRIC } = require("../constants/klaviyo");
let axios = require("axios");

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  timeout: 10000,
  url: 'https://a.klaviyo.com/api/events/',
  headers: {
    'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
    'accept': 'application/json',
    'content-type': 'application/json',
    'revision': '2024-06-15'
  },
};

exports.placeOrder = async (eventBriteData) => {
  try {
    let klaviyoEvent = JSON.stringify({
      data: {
        type: "event",
        "attributes": {
          "time": eventBriteData?.created,
          "value": eventBriteData?.costs?.gross?.value,
          "value_currency": eventBriteData?.costs?.gross?.currency,
          "properties": {
            "event_id": eventBriteData?.event_id,
            "full_name": eventBriteData?.name,
            "promo_code": eventBriteData?.promo_code,
            "ticket_type": eventBriteData?.ticket_type,
            "ticket_quantity": eventBriteData?.ticket_quantity,
            "check_in_status": eventBriteData?.status,
            "order_id": eventBriteData?.id
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

    config.data = klaviyoEvent;
    await axios.request(config)

    return "Order placed successfully";
  } catch (error) {
    console.log(error.message, "error");
  }
};

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
          source: eventData.source
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

  config.data = klaviyoEvent;
  await axios.request(config)
  return "Event Created successfully";
};

exports.orderUpdated = async (eventBriteData) => {
  try {
    let klaviyoEvent = JSON.stringify({
      data: {
        type: "event",
        "attributes": {
          "time": eventBriteData?.created,
          "value": eventBriteData?.costs?.gross?.value,
          "value_currency": eventBriteData?.costs?.gross?.currency,
          "properties": {
            "event_id": eventBriteData?.event_id,
            "full_name": eventBriteData?.name,
            "promo_code": eventBriteData?.promo_code,
            "ticket_type": eventBriteData?.ticket_type,
            "ticket_quantity": eventBriteData?.ticket_quantity,
            "check_in_status": eventBriteData?.status,
            "order_id": eventBriteData?.id
          },
          metric: { data: { type: 'metric', attributes: { name: KLAVIYO_METRIC.ORDER_UPDATED } } },
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
    config.data = klaviyoEvent;
    await axios.request(config)

    return "Order updated successfully";
  } catch (error) {
    console.log(error.message, "error");
  }
};

exports.orderRefunded = async (eventBriteData) => {
  try {
    let klaviyoEvent = JSON.stringify({
      data: {
        type: "event",
        "attributes": {
          "time": eventBriteData?.created,
          "value": eventBriteData?.costs?.gross?.value,
          "value_currency": eventBriteData?.costs?.gross?.currency,
          "properties": {
            "event_id": eventBriteData?.event_id,
            "full_name": eventBriteData?.name,
            "promo_code": eventBriteData?.promo_code,
            "ticket_type": eventBriteData?.ticket_type,
            "ticket_quantity": eventBriteData?.ticket_quantity,
            "check_in_status": eventBriteData?.status,
            "order_id": eventBriteData?.id
          },
          metric: { data: { type: 'metric', attributes: { name: KLAVIYO_METRIC.ORDER_REFUNDED } } },
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
    config.data = klaviyoEvent;
    await axios.request(config)

    return "Order refunded successfully";
  } catch (error) {
    console.log(error.message, "error");
  }
};

exports.eventPublished = async (eventData) => {
  try {
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
            source: eventData.source
          },
          "time": eventData.created,
          value: eventData.capacity,
          value_currency: eventData.currency,
          metric: { data: { type: 'metric', attributes: { name: KLAVIYO_METRIC.EVENT_PUBLISHED } } },
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
    config.data = klaviyoEvent;
    await axios.request(config)

    return "Event Published successfully";
  } catch (error) {
    console.log(error.message, "error");
  }
}

exports.attendeeUpdated = async (eventBriteData) => {
  try {
    let klaviyoEvent = JSON.stringify({
      data: {
        type: "event",
        "attributes": {
          "time": eventBriteData?.created,
          "value": eventBriteData?.costs?.gross?.value,
          "value_currency": eventBriteData?.costs?.gross?.currency,
          "properties": {
            "event_id": eventBriteData?.event_id,
            "promo_code": eventBriteData?.promo_code,
            "order_id": eventBriteData?.order_id,
            "ticket_class_id": eventBriteData?.ticket_class_id,
            "delivery_method": eventBriteData?.delivery_method,
            "ticket_class_name": eventBriteData?.ticket_class_name,
            "status": eventBriteData?.status,
            "checked_in": eventBriteData?.checked_in,
            "cancelled": eventBriteData?.cancelled,
            "refunded": eventBriteData?.refunded,
            "affiliate": eventBriteData?.affiliate,
            "ticket_type": eventBriteData?.ticket_type,
            "ticket_quantity": eventBriteData?.ticket_quantity
          },
          metric: { data: { type: 'metric', attributes: { name: KLAVIYO_METRIC.ATTENDEE_UPDATED } } },
          "profile": {
            "data": {
              "type": "profile",
              "attributes": {
                "first_name": eventBriteData?.profile?.first_name,
                "last_name": eventBriteData?.profile?.last_name,
                "email": eventBriteData?.profile?.email
              }
            }
          }
        }
      }
    })

    config.data = klaviyoEvent;
    await axios.request(config)

    return "Attendee updated successfully";
  } catch (error) {
    console.log(error.message, "error");
  }
};

exports.attendeeCheckedIn = async (eventBriteData) => {
  try {
    let klaviyoEvent = JSON.stringify({
      data: {
        type: "event",
        "attributes": {
          "time": eventBriteData?.created,
          "value": eventBriteData?.costs?.gross?.value,
          "value_currency": eventBriteData?.costs?.gross?.currency,
          "properties": {
            "event_id": eventBriteData?.event_id,
            "promo_code": eventBriteData?.promo_code,
            "order_id": eventBriteData?.order_id,
            "ticket_class_id": eventBriteData?.ticket_class_id,
            "delivery_method": eventBriteData?.delivery_method,
            "ticket_class_name": eventBriteData?.ticket_class_name,
            "status": eventBriteData?.status,
            "checked_in": eventBriteData?.checked_in,
            "cancelled": eventBriteData?.cancelled,
            "refunded": eventBriteData?.refunded,
            "affiliate": eventBriteData?.affiliate,
            "quantity": eventBriteData?.quantity
          },
          metric: { data: { type: 'metric', attributes: { name: KLAVIYO_METRIC.ATTENDEE_CHECKED_IN } } },
          "profile": {
            "data": {
              "type": "profile",
              "attributes": {
                "first_name": eventBriteData?.profile?.first_name,
                "last_name": eventBriteData?.profile?.last_name,
                "email": eventBriteData?.profile?.email
              }
            }
          }
        }
      }
    });

    config.data = klaviyoEvent;
    await axios.request(config)
    return "Attendee checkedIn successfully";
  } catch (error) {
    console.log(error, "error");
  }
};

exports.attendeecheckedOut = async (eventBriteData) => {
  try {
    let klaviyoEvent = JSON.stringify({
      data: {
        type: "event",
        "attributes": {
          "time": eventBriteData?.created,
          "value": eventBriteData?.costs?.gross?.value,
          "value_currency": eventBriteData?.costs?.gross?.currency,
          "properties": {
            "event_id": eventBriteData?.event_id,
            "promo_code": eventBriteData?.promo_code,
            "order_id": eventBriteData?.order_id,
            "ticket_class_id": eventBriteData?.ticket_class_id,
            "delivery_method": eventBriteData?.delivery_method,
            "ticket_class_name": eventBriteData?.ticket_class_name,
            "status": eventBriteData?.status,
            "checked_in": eventBriteData?.checked_in,
            "cancelled": eventBriteData?.cancelled,
            "refunded": eventBriteData?.refunded,
            "affiliate": eventBriteData?.affiliate,
            "quantity": eventBriteData?.quantity
          },
          metric: { data: { type: 'metric', attributes: { name: KLAVIYO_METRIC.ATTENDEE_CHECKED_OUT } } },
          "profile": {
            "data": {
              "type": "profile",
              "attributes": {
                "first_name": eventBriteData?.profile?.first_name,
                "last_name": eventBriteData?.profile?.last_name,
                "email": eventBriteData?.profile?.email
              }
            }

          }
        }
      }
    });

    config.data = klaviyoEvent;
    await axios.request(config)

    return "Attendee checked out successfully";
  } catch (error) {
    console.log(error, "error");
  }
};
