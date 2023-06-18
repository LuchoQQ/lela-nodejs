const axios = require("axios");
require("dotenv").config();
let URI = process.env.URI_WEBHOOK_WPP;
let TOKEN = process.env.TOKEN_WEBHOOK;

const sendWpp = async (to, content) => {
    const body = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "text",
        text: {
            // the text object
            preview_url: false,
            body: content,
        },
    };
    const options = {
        headers: { "Authorization": `Bearer ${TOKEN}` },
    };

    let result = await axios
        .post(URI, body, options)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    return result;
};

module.exports = {
    sendWpp,
};
