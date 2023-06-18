let URI = process.env.URI_WEBHOOK_WPP;
let TOKEN = process.env.TOKEN_WEBHOOK;
export const replyMessage = async (req, res) => {
    let result = await axios
        .post(
            URI,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: "5493794913997",
                type: "text",
                text: {
                    // the text object
                    preview_url: false,
                    body: "Holaa",
                },
            },
            {
                headers: { Authorization: `Bearer ${TOKEN}` },
            }
        )
        .catch((err) => console.log(err));
};
