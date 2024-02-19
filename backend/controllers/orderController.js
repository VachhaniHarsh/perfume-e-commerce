const Order = require('../models/orderModel');
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");

// create new order
exports.newOrder = asyncHandler(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice} = req.body;  
});