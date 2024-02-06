const express = require("express");
const productRouter = require("./Routes/product.router");
const orderRouter = require("./Routes/order.router");
const { ConnectDb } = require("./Database/db.config");
const crypto = require("crypto");
const cors = require("cors");
const userRouter = require("./Routes/user.router");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/", productRouter);
app.use("/api", orderRouter);
app.use("/api", userRouter);

app.listen(5000, () => {
  console.log("server listening on port", 5000);
});

ConnectDb();
