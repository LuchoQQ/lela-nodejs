require("dotenv").config();

const { sendPrompt } = require("../utils/api/gpt");
const { sendWpp } = require("../utils/api/wpp");
const verify_token = process.env.VERIFY_TOKEN;

const createMessage = async (req, res) => {
    const to = req.body.entry[0].changes[0].value.messages[0].from;
    const messageReceived =
        req.body.entry[0].changes[0].value.messages[0].text.body;

    const prompt = await sendPrompt(messageReceived);

    if (prompt) {
        sendWpp(to, prompt);
        return res.json({
            status: "ok",
        });
    } else {
        return res.json({
            status: 'failed'
        })
    }
};

const validateToken = async (req, res) => {
    /**
     * UPDATE YOUR VERIFY TOKEN
     *This will be the Verify Token value when you set up webhook
     **/
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === "subscribe" && token === verify_token) {
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
    // Parse params from the webhook verification request
};

module.exports = {
    createMessage,
    validateToken,
};
