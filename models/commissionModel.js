const mongoose = require("mongoose");
const commissionSchema =  new mongoose.Schema({
referrer: {type: String, required: true},
commission : {type: Number, required: true},
withdrawalStatus:{type:String,
    enum: ["Balance", "Withdrawn"],
    default:"Balance"}
    
 

});

 const Commission = mongoose.model("commission", commissionSchema);
 module.exports = Commission;