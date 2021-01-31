const express = require("express");
const auth = require("./auth/userAuth");
const router = express.Router();
const token = require("./auth/token");

router.post("/signup", auth.signUp);
router.post("/signin", auth.signIn);
router.get("/guard", token.middleware, auth.guard);

module.exports = router;
