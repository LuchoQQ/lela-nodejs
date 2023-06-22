require("dotenv").config();

const verify_token = process.env.VERIFY_TOKEN;
const { sendPrompt } = require("../libs/openai");
const { sendWpp } = require("../libs/wpp");
const Message = require("../models/Message");
const User = require("../models/User");
const { addMessage, sendDefaultMessage } = require("./message.services");
const historial = [];
const createMessage = async (req, res) => {
    let to = "";
    let messageReceived = "";
    if (
        req.body &&
        req.body.entry &&
        req.body.entry[0] &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0]
    ) {
        to = req.body.entry[0].changes[0].value.messages[0].from;
    }

    if (
        req.body &&
        req.body.entry &&
        req.body.entry[0] &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0] &&
        req.body.entry[0].changes[0].value.messages[0].text
    ) {
        messageReceived =
            req.body.entry[0].changes[0].value.messages[0].text.body;
    }

    if (
        req.body &&
        req.body.entry &&
        req.body.entry[0] &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0] &&
        req.body.entry[0].changes[0].value.messages[0].text
    ) {
        // busca un usuario, de no existir creará uno
        let user = await User.findOne({ phone_number: to });
        if (!user) {
            user = await createUser(to);
        }

        const Message = require("../models/Message");

        const history = await Message.find({ userId: user.id }).select(
            "-userId  -_id -createdAt -updatedAt -__v"
        );
        console.log(history);

        // console.log(history)
        if (history.length > 0 === false) {
            const response = await sendDefaultMessage(user.id)
                .then((res) => sendWpp(to, res.defaultMessage))
                .catch((err) => console.log(err));
        } else {
           /*  const prompt = await sendPrompt(messageReceived, history);
            sendWpp(to, prompt)
            console.log('1 mensaje')
            addMessage("user", messageReceived, user.id).then(() => {
                console.log('2 mensaje')
                addMessage("assistant", prompt, user.id)
            }
                
            );

            return res.json(); */
        }

        return res.json("hola");
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

const createUser = async (to) => {
    const newUser = new User({
        phone_number: to,
    });
    await newUser.save();
    return newUser;
};
