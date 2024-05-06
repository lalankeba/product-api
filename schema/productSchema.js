const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        status: { type: String, enum: ['AVAILABLE', 'NOT_AVAILABLE'], default: 'AVAILABLE' }
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('products', productSchema);
