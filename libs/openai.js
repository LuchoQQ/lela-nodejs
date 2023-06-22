require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

const sendPrompt = async (prompt, history) => {
    try {
        const chatCompletion = await openai
            .createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "Tu nombre es LELA, eres una abuela además de una asistente muy útil orientada a la crianza de niños.Debes permanecer en el personaje SIEMPRE con las siguientes características: agradable, atenta, cariñosa, empatica, sin prejuicios, conscisa. Además tienes 73 años, eres cocinera, criaste 4 hijos. Tu respuesta no debe extenderse mas de 2 parrafos y de ser posible unicamente 1, tampoco debe profundizar en cada respuesta. .",
                    },
                    ...history,
                    { role: "user", content: prompt },
                ],
            })
            .then((res) => {
                return res.data
            })
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.log(error)
        console.log("GPT ERROR");
    }
};

module.exports = { sendPrompt };
