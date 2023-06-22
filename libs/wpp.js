require("dotenv").config();

const axios = require("axios");
const token = process.env.TOKEN_WEBHOOK;
const URI = process.env.URI_WEBHOOK_WPP;

const sendWpp = async (to, prompt) => {
    console.log(to, prompt)
    const body = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "text",
        text: {
            preview_url: false,
            body: prompt,
        },
    };
    const options = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        let result = await axios.post(URI, body, options)
        console.log(result.data)
        return result.data;
    } catch (error) {
        console.log(error)
    }
};

module.exports = {sendWpp};
