const mongoose = require('mongoose');

// Product Schema
const productSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String},
    start_price: {type: Number},
    reserve_price: {type: Number},
    image: {type: String},
    category: {type: String},
    subcategory: {type: String},
    location: {type: String},
    condition: {type: String},
    auction_start_date: {type: Date},
    auction_start_time: {type: String},
    auction_end_date: {type: Date},
    auction_end_time: {type: String},
});

// define and export
module.exports = mongoose.model('Product', productSchema);