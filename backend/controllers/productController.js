const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/apifeatures");

// Create Product -- Admin
exports.createProduct = asyncHandler(async (req, res,next) => {
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
    const resultPerPage = 5;
    
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query ;
    
    res.status(200).json({
        success: true,
        products,
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


