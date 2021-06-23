const mongoose = require("mongoose");
const commissionSchema = new mongoose.Schema({
  referrer: { type: String, required: true },
  commission: { type: Number, required: true },
  withdrawalStatus: {
    type: String,
    enum: ["Pending", "Withdrawn"],
    default: "Pending",
  },
});

const Commission = mongoose.model("commission", commissionSchema);
module.exports = Commission;
