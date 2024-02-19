const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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


exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }); 
    
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = user.getResetPasswordToken();
    
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${ resetToken }`;
     
    const message = `Your password reset link is :- \n\n ${resetPasswordUrl} \n\n If you have not requested for a password reset, then please ignore this email.`

    try {
        await sendEmail({
            email: user.email,
            subject: `OdeurX password reset link`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Password reset email send to ${user.email} succesfully!`,
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));    
    }
});

exports.resetPassword = asyncHandler(async (req, res, next) => { 

    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    
    if (!user) {
        return next(new ErrorHandler("Reset password link is invalid or has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    
    sendToken(user, 200, res);
});

//after login
exports.getUserDetails = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
});

// Update user password
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password invalid!"), 401);
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match"), 401);
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// update user (email and name)
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    // Avatar updation to be added later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success: true,
        user,
    })
});

// get all users (admin only)
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
});

// get single user (admin only)
exports.getSingleUser = asyncHandler(async (req, res, next) => {
    
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`), 401);
    }

    res.status(200).json({
        success: true,
        user,
    })
});

// update user profile (admin only)
exports.updateUserRole = asyncHandler(async (req, res, next) => {
    const newUserData = {
        email: req.body.email,
        role : req.body.role,
    }

    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`), 401);
    }

    user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success: true,
        message: `Role updated to ${req.body.role}`,
    })
});

// update user profile
exports.deleteUser = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`), 401);
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted"
    })
});


