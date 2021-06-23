const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
  title: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  otherName: { type: String },
  email: { type: String, required: true },
  bank: { type: String, required: true },
  accountName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  invesmentPeriod: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  referralCode: { type: String, required: true },
  referrer: { type: String, required: false },
  registrationDate: { type: Date, required: true },
  user_id: { type: String, required: false },
});
const Member = mongoose.model("member", memberSchema);
module.exports = Member;
