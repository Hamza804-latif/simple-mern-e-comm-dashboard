const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const jwt = require("jsonwebtoken");

const jwtkey = "myEcommerceStoreProject?123";
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", (req, resp) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      resp.send(err);
    } else {
      result = result.toObject();
      delete result.password;
      jwt.sign({ result }, jwtkey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          resp.send({ message: "some thing went wrong" });
        } else {
          resp.send({ user: result, auth: token });
        }
      });
    }
  });
});

app.post("/login", async (req, resp) => {
  if (req?.body?.email && req?.body?.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtkey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          resp.send({
            message: "Something went wrong. Please try after some time",
          });
        } else {
          resp.send({ user, auth: token });
        }
      });
    } else {
      resp.send({ message: "Incorrect email or password" });
    }
  } else {
    resp.send({ message: "Incorrect email or password" });
  }
});

app.post("/add-product", VerifyToken, async (req, resp) => {
  if (req.body.name && req.body.userId) {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send({ result, message: "data saved successfully" });
  } else {
    resp.send({ message: "Bad Request please send data" });
  }
});

app.get("/products", VerifyToken, async (req, resp) => {
  let product = await Product.find();
  if (product.length > 0) {
    resp.send(product);
  } else {
    resp.send({ message: "No Data Found" });
  }
});

app.delete("/product/:id", VerifyToken, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", VerifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ message: "no data found" });
  }
});

app.put("/update", VerifyToken, async (req, resp) => {
  console.log(req);
  let result = await Product.updateOne(
    { _id: req.body._id },
    { $set: req.body }
  );
  if (result) {
    resp.send({ result, message: "data updated successfully" });
  } else {
    resp.send({ message: "some error occurred data could not be updated" });
  }
});

app.get("/search/:key", VerifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

function VerifyToken(req, resp, next) {
  let token = req?.headers["auth"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        resp.status(401).send({ message: "Token is not valid" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ message: "please provide token" });
  }
}
app.listen(5000);
