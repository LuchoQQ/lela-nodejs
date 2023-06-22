const express = require("express");

const app = express();


//middlewares
app.use(express.json())



//database connection
const connectDB = require('./libs/mongoose')
connectDB()



//routing
const webhookRouting = require('./routing/webhook.routing');
app.use('/webhook',webhookRouting)



//server
app.listen(process.env.PORT | 3000);
console.log('server running on 3000')
