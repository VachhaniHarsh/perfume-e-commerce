const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/apifeatures");

// Create Product -- Admin
exports.createProduct = asyncHandler(async (req, res,next) => {
    req.body.user = req.user.id;
    
    const product = await Product.create(req.body);
    
    res.status(200).json({
        success: true,
        product,
    });
})

// Get All Products
exports.getAllProducts = asyncHandler(async (req, res) => {

    // keeping it 5 for now
    // need to change it in the future
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage
    });
})

exports.getProductDetails = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Product not found",
        // })
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    })
})

// Update Product with given id 
exports.updateProduct = asyncHandler(async (req, res,next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Product not found",
        // })

        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
})

// Delete Product with given Id
exports.deleteProduct = asyncHandler(async (req, res,next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Product not found",
        // })
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message:"Product deleted",
    });
})



////////////////////////////////////////////////////////////////////
// Create or Update Product review (1 review/person for any product)
exports.createProductReview = asyncHandler(async (req, res, next) => {
    const { productId, comment, rating } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user.id.toString());

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user.id.toString()) {
                rev.rating = rating,
                rev.comment = comment
            }
        })
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let total = 0;
    product.reviews.forEach(rev => { total += rev.rating });
    product.ratings = total/(product.reviews.length);
    
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success:true,
    })
});

// Get all reviews
exports.getProductReviews = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//Delete reviews
exports.deleteReview = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString()!==req.query.id.toString());

    let total = 0;
    reviews.forEach((rev) => { total += rev.rating });
    let ratings;
    let numOfReviews;

    if (reviews.length == 0) {
        ratings = 0;
        numOfReviews = 0;
    }
    else {
        ratings = total/(reviews.length);
        numOfReviews = Number(reviews.length);
    }

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings:Number(ratings),    
        numOfReviews,
    }, {
        new: true,
        runValidators: false,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message:"Review deleted"
    });
});
