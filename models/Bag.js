// backend/models/Bag.js
const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    description: { type: String, required: false },
    customerPhone: { type: String, required: true },
    status: { type: String, enum: ['pending', 'repaired'], default: 'pending' },
    price: { type: Number, required: false, default: 0 },
    bagReceivedDate: { type: Date, default: Date.now },
    bagRepairedDate: { type: Date }
});

module.exports = mongoose.model('Bag', bagSchema);
