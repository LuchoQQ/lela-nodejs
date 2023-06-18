const express = require("express");

const app = express();

app.use(express.json())


//routing
const webhookRouting = require('./routing/webhook.routing')
app.use(webhookRouting)



//server
app.listen(process.env.PORT | 3000);
