const express = require("express");
const auth = require("./auth/userAuth");
const router = express.Router();

const middleware = (req, res, next) => {
  console.log(new Date());
  next();
};

router.post("/signup", auth.signUp);
router.post("/signin", auth.signIn);
router.get("/guard", middleware, auth.guard);

module.exports = router;
