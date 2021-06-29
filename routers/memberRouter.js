const router = require("express").Router();
const shortid = require("shortid");
const Member = require("../models/memberModel");

const auth = require("../middleware/auth");

//create new member
router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      firstName,
      referrer,
      otherName,
      lastName,
      phoneNumber,
      bank,
      accountName,
      accountNumber,
      invesmentPeriod,
      email,
      user_id,
    } = req.body;
    const registrationDate = Date.now();
    const referralCode = shortid.generate();
    const newMember = new Member({
      title,
      firstName,
      referrer,
      otherName,
      lastName,
      email,
      phoneNumber,
      bank,
      accountName,
      accountNumber,
      invesmentPeriod,
      referralCode,
      registrationDate,
      user_id,
    });
    const savedMember = await newMember.save();

    res.json(savedMember);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
//get all customers
router.get("/", auth, async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

//get all customers
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ user_id: id });
    res.status(200).json(member);
    // res.send("hi")
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
router.get("/detail/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ _id: id });
    res.status(200).json(member);
    // res.send("hi")
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
router.get("/checkCode/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ referralCode: id });
    if (!member) return res.json(false);
    else
    res.status(200).json(true);
    // res.send("hi")
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
router.get("/referrer/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ referralCode: id });
    res.status(200).json(member);
    // res.send("hi")
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
module.exports = router;
