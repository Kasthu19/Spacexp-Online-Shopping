const express = require("express");
const router = express.Router();
const { saveContact } = require("../controller/contact");

router.post("/", saveContact);

module.exports = router;
