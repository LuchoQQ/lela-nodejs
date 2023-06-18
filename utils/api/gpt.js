require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

const sendPrompt = async (prompt,) => {
    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        })
        console.log(chatCompletion.data.choices[0].message)
        
        return chatCompletion.data.choices[0].message.content
    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendPrompt };
