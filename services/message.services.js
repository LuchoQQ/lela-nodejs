const Message = require("../models/Message");

const addMessage = async (role, content, userId) => {

     const newMessage = new Message({
        role,
        content,
        userId,
    });
    await newMessage.save();
};

const sendDefaultMessage = async (userID) => {
    const defaultMessage = `¡Hola! Soy la abuela *Lela*👵🏼. Estaré encantada de ayudarte en la crianza de tus hijos.
    Puedes:
    
    🔅 Hacerme preguntas
    🔅 Agendar reuniones, tareas, cumpleaños u otras actividades 
    🔅 Transcribir audios
    
    *¡Escríbeme o mándame un audio con lo que necesites!*
    `;
    try {
        const newMessage = new Message({
            userId: userID,
            role: "system",
            content: defaultMessage,
        });
        await newMessage.save();
        return {
            status: "ok",
            defaultMessage,
        };
    } catch (error) {
        console.log(error);
    }

    return;
};

module.exports = { addMessage, sendDefaultMessage };
