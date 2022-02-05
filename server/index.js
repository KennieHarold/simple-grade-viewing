const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const httpServer = require("http").createServer(app);
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const apis = require("./apis");
apis.configure(app);

app.get("/", function (req, res) {
  res.send("Grading Server Running!");
});

const port = process.env.PORT || 8080;

httpServer.listen(port, () =>
  console.log(`Server up and running on port ${port}!`)
);
