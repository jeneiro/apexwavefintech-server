const mongoose = require("mongoose");
const profitSchema = new mongoose.Schema({
  profit: { type: Number, required: true },
  trans_date: { type: Date, required: true },
  user_id: { type: String, required: true },
  fullName: { type: String, required: true },
  withdrawalStatus: {
    type: String,
    enum: ["Pending", "Withdrawn"],
    default: "Pending",
  },
  recepient: {
    type: String,
    enum: ["Apexwavefintech", "Referrer", "Investor"],
    required: true,
  },
});
const Profit = mongoose.model("profit", profitSchema);
module.exports = Profit;
