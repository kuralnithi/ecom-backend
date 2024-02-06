const Razorpay = require("razorpay");
const orderModel = require("../Models/orderModel");
require("dotenv").config();
const crypto = require("crypto");
exports.createOrder = async (req, res) => {
  const cartItems = req.body;

  
  const amount = Number(
    cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.qty;
    }, 0)
  ).toFixed(2);
  const status = "pending";

  const order = await orderModel.create({
    cartItems: cartItems,
    amount: amount,
    status: status,
  });

  console.log(amount);

  console.log(req.body);

  res.status(200).json({ message: "order created", data: order });
};

exports.razorPayment = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "failed to create order" });
    }
    return res
      .status(200)
      .json({ message: "ordees created successfully", data: order });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "failed to create order", data: error });
  }
};

exports.paymentValidation = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHash("sha256", process.env.RAZORPAY_KEY_SECRET);

  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(500).json({ message: "this transaction is not valid" });
  }
  res
    .status(200)
    .json({ message: "this transaction is valid", data: req.body });
};