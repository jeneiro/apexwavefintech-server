const router = require("express").Router();
const Commision = require("../models/commissionModel");

const auth = require("../middleware/auth");

//register User
router.post("/", auth, async (req, res) => {
  try {
    const { referrer, commission } = req.body;
    // const trans_date = Date.now();
    const newCommision = new Commision({ referrer, commission });

    const savecommission = await newCommision.save();
    res.json(savecommission);
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
    const updateStatus = await Commision.updateOne(
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
router.get("/", auth, async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const commissions = await Commision.find({
      referrer: id,
      withdrawalStatus: "Pending",
    });

    let commissionSum = [];
    let commissionID = [];

    const totalCommission = commissions.map((com) => {
      if (com.withdrawalStatus === "Pending") {
        commissionSum.push(com.commission);
      }
      // console.log(com.commission);
      return com.commission;
    });

    const id_Commission = commissions.map((com) => {
      if (com.withdrawalStatus === "Pending") {
        commissionID.push(com._id);
      }

      return com._id;
    });

    var sum = totalCommission.reduce(function (a, b) {
      return a + b;
    }, 0);

    let commissionObj = { sum: sum, id: commissionID };
    res.json(commissionObj);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
module.exports = router;
