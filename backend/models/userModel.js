const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minLength : [2,"Name should have atleast 2 characters"],
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate : [validator.isEmail, "Please enter a valid email"],
    },

    password: {
        type: String, 
        required: [true, "Please enter your password"],
        minLength: [8, "Password should have atlease 8 characters"],
        select: false,
        // At the time of query, we should not be able to access anyones password hence select : false
    },

    avatar: {
        public_id: {
            type: String,
            required :true,
        },

        url: {
            type: String,
            required :true,
        },
    },

    role: {
            type: String,
            default:"user",
    },

    resetPasswordToken: String,
    resetPasswordExpire : Date,
})

userSchema.pre("save", async function (next) {
    
    if(!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);

})

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,)
}

//Comparing Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Resseting Password (Forgot Password)
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("User", userSchema);