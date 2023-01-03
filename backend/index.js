const express = require("express");

const app = express();
app.get("/", (req, resp) => {
  resp.send("this is home route");
});

app.listen(5000);
