const mongoose = require("mongoose");
const investmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  amount: { type: Number, required: true },
  referrer: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Payment Confirmed"],
    default: "Pending",
  },
  trans_date: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  user_id: { type: String, required: true },
  investmentPeriod: { type: String, required: true },
  commission: { type: Number, required: true },
});
const Investment = mongoose.model("investment", investmentSchema);
module.exports = Investment;
