const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");

const app = express();
app.use(express.json());
app.use(cors());
app.post("/register", (req, resp) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.send(result);
      console.log("response", result);
    }
  });
});

app.listen(5000);
