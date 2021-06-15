const router = require("express").Router();
const Withdrawal = require("../models/withdrawalModel");

const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { user_id, amount } = req.body;
    const withdrawal_date = Date.now();
    const newCommision = new Withdrawal({ user_id, amount, withdrawal_date });

    const savecommission = await newCommision.save();
    res.json(savecommission);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find();

    res.json(withdrawals);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const withdrawals = await Withdrawal.find({ user_id: id });

    res.json(withdrawals);
    // console.log(com.commission);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

router.post("/approve/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    var newStatus = { $set: { withdrawalStatus: "Approved" } };

    const updateStatus = await Withdrawal.updateOne(
      { _id: id },
      newStatus,
      function (err, res) {
        if (err) throw err;
      }
    );
    const withdrawals = await Withdrawal.find();
    res.json(withdrawals);
    // console.log(com.commission);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
router.post("/withdrawn/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    var newStatus = { $set: { withdrawalStatus: "Withdrawn" } };

    const updateStatus = await Withdrawal.updateOne(
      { _id: id },
      newStatus,
      function (err, res) {
        if (err) throw err;
      }
    );
    const withdrawals = await Withdrawal.find();
    res.json(withdrawals);
    // console.log(com.commission);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
module.exports = router;
