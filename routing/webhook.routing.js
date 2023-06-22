const express = require("express");
const { createMessage, validateToken } = require("../services/webhook.services");

const router = express.Router();

router.post("/", createMessage);

router.get("/", validateToken);

module.exports = router;
