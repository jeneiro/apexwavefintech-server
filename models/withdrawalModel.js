const mongoose = require("mongoose");
const withdrawalSchema =  new mongoose.Schema({
withdrawal_date:{type:Date, required: true} ,
amount : {type: Number, required: true},
user_id: {type: String, required: true},
withdrawalStatus:{type:String,
    enum: ["Processing", "Approved", "Withdrawn"],
    default:"Processing"}
    
 

});

 const Withdrawal = mongoose.model("withdrawal", withdrawalSchema);
 module.exports = Withdrawal;