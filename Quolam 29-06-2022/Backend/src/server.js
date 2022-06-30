const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 2345;
const app = express();

app.use(express.json());
app.use(cors());

const productController = require("./controllers/products.controller");

app.use("/products", productController);

app.listen(port, async (req, res) => {
  try {
    await connect();
    console.log(`Server Running On Port ${port}`);
  } catch (er) {
    console.log(er.message);
  }
});
