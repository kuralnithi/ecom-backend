const express = require("express");
const {
  createOrder,
  razorPayment,
  paymentValidation,
} = require("../Controllers/order.controller");
const router = express.Router();

router.get("/order", createOrder);
router.post("/payorder", razorPayment);
router.post("/payvalid", paymentValidation);

module.exports = router;
