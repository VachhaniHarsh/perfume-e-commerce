const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        // The 2nd parameter in the array in require is the message when the 1st parameter fails
        required: [true, "Please enter product name"],
        trim: true,
    },

    description: {
        type: String,
        required : [true,"Please enter product description"],
    },

    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength : [8,"Price cannot exceed 8 figures"]
    },

    rating: {
        type: Number,
        default: 0,
    },

    // one can add multiple images for a single product hence we have choosed to keep it as an array
    images: [
        {
            public_id: {
                type: String,
                required :true,
            },

            url: {
                type: String,
                required :true,
            },
        }
    ],

    category: {
        type: String,
        required :[true,"Please enter product category"],
    },

    stock: {
        type: Number,
        required: [true, "Please enter product category"],
        maxLength: [4, "Price cannot exceed 4 characters"],
        default: 1,
    },

    numOfReviews: {
        type: Number,
        default: 0,
    },

    reviews: [
        {
            name:{
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required:true,
            },
            
        }
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        req: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);