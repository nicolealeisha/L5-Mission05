// const mongoose = require('mongoose');
import mongoose from 'mongoose'

// Product Schema
const productSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String},
    start_price: {type: Number},
    reserve_price: {type: Number},
    buy_now_price: {type: Number},
    current_bid: { type: [Number], default: [] }, // Ammended to make this an array of bids
    image: {type: String},
    category: {type: String},
    subcategory: {type: String},
    location: {type: String},
    condition: {type: String},
    auction_start_date: {type: Date},
    auction_end_date: {type: Date},
    seller_name: {type: String},
    seller_image: {type: String},
    seller_rating: {type: Number},
    seller_location: {type: String},
    seller_member_since: {type: Date},
});

// define and export
// module.exports = mongoose.model('Product', productSchema);
const Product = mongoose.model('Product', productSchema);
export default Product;
