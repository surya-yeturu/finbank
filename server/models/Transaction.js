const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    description: { type: String, default: '' },
    type: { type: String, enum: ['credit', 'debit'], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);


