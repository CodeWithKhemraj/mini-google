
const express = require("express");
const router = express.Router();
const { TestUser } = require("../controller/test")

router.get("/", TestUser);


module.exports = router;