const express = require("express");
const app = express();
const routes = require("./src/routes");

app.get("/", (req, res) => res.send("Ok"));

app.use(express.json());

app.use("/api", routes);

app.listen(3000);
