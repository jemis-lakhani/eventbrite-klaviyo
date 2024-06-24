const { placeOrder, attendeeUpdated, orderRefunded, orderUpdated, eventPublished, attendeeCheckedIn, attendeecheckedOut } = require("./klaviyo.js");

//*import the axios helper
const {  axiosRequest } = require("../helpers/axios.helper");
const response = require("../helpers/api.response.helper");

module.exports = {
  webhook: async (req, res) => {
    try {
      let webhookData = req.body;
      if (webhookData?.api_url && webhookData.api_url.includes("https://www.eventbriteapi.com/v3")) {

        //* need to handle the event data error here
        let eventData = await axiosRequest("GET", webhookData?.api_url);

        if (webhookData?.config?.action === "order.placed") {
          await placeOrder(eventData); // call the function according to the event
        }

        if (webhookData?.config?.action === "event.created") {
          await createEvent(eventData); // call the function according to the event
        }

        if (webhookData?.config?.action === "attendee.updated") {
          await attendeeUpdated(eventData); // call the function according to the event
        }

        if (webhookData?.config?.action === "order.refunded") {
          await orderRefunded(eventData); // call the function according to the event
        }

        if (webhookData?.config?.action === "event.published") {
          await eventPublished(eventData); // call the function according to the event
        }

        if (webhookData?.config?.action === "order.updated") {
          await orderUpdated(eventData); // call the function according to the event
        }

        if (webhookData?.config?.action === "barcode.checked_in") {
          await attendeeCheckedIn(eventData); // call the function according to the event
        }

        if (webhookData?.config?.action === "barcode.un_checked_in") {
          await attendeecheckedOut(eventData); // call the function according to the event
        }

        return response.OK({
          res,
          message: "Webhook Run Successfully",
          payload: eventData.data,
        });
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