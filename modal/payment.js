const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   item: {
      type: Array,
      required: true
   },
   paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      required: true
   },
   transactionId: {
      type: String,
      required: true
   }
});

const Payment = mongoose.model('payment', paymentSchema);
module.exports = Payment;