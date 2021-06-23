const router = require("express").Router();
const Profit = require("../models/profitModel");

const auth = require("../middleware/auth");

//register User
router.post("/", auth, async (req, res) => {
  try {
    const { profit, user_id, recepient, fullName } = req.body;
    const trans_date = Date.now();
    const newProfit = new Profit({
      profit,
      recepient,
      user_id,
      trans_date,
      fullName,
    });

    const saveProfit = await newProfit.save();
    res.json(saveProfit);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const profitlist = await Profit.find();
    res.json(profitlist);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const profititem = await Profit.find({
      user_id: id,
      recepient: "Investor",
    });

    res.json(profititem);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
router.get("/sum/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const profititem = await Profit.find({
      user_id: id,
      recepient: "Investor",
    });
    let profitSum = [];
    let profitID = [];

    const totalProfit = profititem.map((com) => {
      if (com.withdrawalStatus === "Pending") {
        profitSum.push(com.profit);
      }

      return com.profit;
    });

    const id_Commission = profititem.map((com) => {
      if (com.withdrawalStatus === "Pending") {
        profitID.push(com._id);
      }

      return com._id;
    });

    var sum = profitSum.reduce(function (a, b) {
      return a + b;
    }, 0);
    console.log(sum);

    let profitObj = { sum: sum, id: profitID };
    res.json(profitObj);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
router.post("/update/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    var newStatus = { $set: { withdrawalStatus: "Withdrawn" } };
    var myQuery = { _id: id };
    const updateStatus = await Profit.updateOne(
      myQuery,
      newStatus,
      function (err, res) {
        if (err) throw err;
      }
    );

    res.status(200).json(updateStatus);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
module.exports = router;
