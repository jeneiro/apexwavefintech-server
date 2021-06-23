const router = require("express").Router();
const Investment = require("../models/investmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/transactionModel");
//const User = require("../models/userModel");
const auth = require("../middleware/auth");

//register User
router.post("/", auth, async (req, res) => {
  try {
    const {
      fullName,
      amount,
      phoneNumber,
      referrer,
      email,
      paymentMethod,
      user_id,
      investmentPeriod,
      commission,
    } = req.body;
    const trans_date = Date.now();

    const newTransaction = new Investment({
      fullName,
      amount,
      phoneNumber,
      referrer,
      email,

      paymentMethod,
      user_id,
      investmentPeriod,
      commission,
      trans_date,
    });

    const savetrans = await newTransaction.save();
    res.json(savetrans);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Investment.find();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await Investment.find({ user_id: id });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
router.post("/approve/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    var newStatus = { $set: { status: "Payment Confirmed" } };

    const updateStatus = await Investment.updateOne(
      { _id: id },
      newStatus,
      function (err, res) {
        if (err) throw err;
      }
    );
    const investment = await Investment.find();
    res.json(investment);
    // console.log(com.commission);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
module.exports = router;
