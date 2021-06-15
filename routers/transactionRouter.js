const router = require("express").Router();
const Transaction = require('../models/transactionModel');
const  bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/transactionModel");
//const User = require("../models/userModel");
const auth = require("../middleware/auth")

//register User
router.post("/", auth, async (req, res)=>{
    try {
        const {amount, currency, status, transaction_id, tx_ref,flw_ref, user_id}= req.body
         const trans_date = Date.now();
         const newTransaction = new Transaction({amount, currency, status,trans_date, transaction_id, tx_ref,flw_ref, user_id});
      
    const savetrans = await newTransaction.save();
        res.json(savetrans);
        
    } catch (err) {
           console.error(err);
        console.log(err);
        res.status(500).send()
    }

   
})
router.get("/", auth,async (req,res)=>{
    try {
        
       const transactions = await Transaction.find();
       res.json(transactions);

    } catch (err){
        console.error(err);
        console.log(err);
        res.status(500).send()
    }

})

router.get("/:id", auth,async (req,res)=>{
    try {
         const { id} = req.params;
       const transactions = await Transaction.find({user_id:id});
       res.json(transactions);

    } catch (err){
        console.error(err);
        console.log(err);
        res.status(500).send()
    }

})
module.exports = router;