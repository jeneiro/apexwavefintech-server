const mongoose = require("mongoose");
const transactionSchema =  new mongoose.Schema({
 amount:{type: Number, required: true},
 currency: {type: String, required: true},
 status: {type: String, required: true},
 trans_date:{type:Date, required: true},
 transaction_id: {type: String, required: true},
 tx_ref:{type: String, required: true},
 flw_ref: {type: String, required: true},
 user_id:{type: String, required: true},
 

 
});
 const Transaction= mongoose.model("transaction",transactionSchema);
 module.exports = Transaction;