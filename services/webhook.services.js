const { sendPrompt } = require("../utils/api/gpt");
const { sendWpp } = require("../utils/api/wpp");

const createMessage = async (req, res) => {
    const to = req.body.entry[0].changes[0].value.messages[0].from;
    const messageReceived =
        req.body.entry[0].changes[0].value.messages[0].text.body;

    sendPrompt(messageReceived).then((res) =>
        sendWpp(to, res)
    );
};

module.exports = {
    createMessage,
};
