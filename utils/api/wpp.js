const axios = require("axios");
require("dotenv").config();
let URI = process.env.URI_WEBHOOK_WPP;
let TOKEN = process.env.TOKEN_WEBHOOK;

const sendWpp = async (to, prompt) => {
    const body = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "text",
        text: {
            // the text object
            preview_url: false,
            body: prompt,
        },
    };
    const options = {
        headers: { Authorization: `Bearer ${TOKEN}` },
    };

    try {
        let result = await axios.post(URI, body, options);
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    sendWpp,
};
