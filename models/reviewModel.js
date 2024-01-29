const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jordan', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
});

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
