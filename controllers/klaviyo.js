import KLAVIYO_METRIC from "../constants/klaviyo";

export const placeOrder = async (eventBriteData) => {
  try {
    console.log(eventBriteData, "eventBriteData");

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

    // Use KLAVIYO_METRIC constatnt for different kind of events

    return "Order placed successfully";
  } catch (error) {
    console.log(error, "error");
  }
};

export const updateOrder = async (eventBriteData) => {};

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
