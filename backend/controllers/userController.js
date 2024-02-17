const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const sendToken = require("../utils/jwtToken");

// Register user
exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample temp id",
            url: "profile pic"
        }
    });

    // const token = user.getJWTToken();

    // res.status(201).json({
    //     success: true,
    //     token,
    // });

    sendToken(user, 201, res);
});

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password"), 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {    
        return next(new ErrorHandler("Invalid email or password"), 401);
    }
    
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password"), 401);
    }

    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     token,
    // })

    sendToken(user,200,res);

});

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    
    res.status(200).json({
        success: true,
        message : "User Logged out",
    })
});
