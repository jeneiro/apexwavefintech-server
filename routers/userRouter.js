const router = require("express").Router();
const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//const { findOne } = require("../models/userModel");
//const User = require("../models/userModel");
const auth = require("../middleware/auth");

//register User
router.post("/register", async (req, res) => {
  try {
    const { email, username, password, verifypassword } = req.body;
    if (!email || !password || !username || !verifypassword) {
      res
        .status(400)
        .json({ "error message": "please enter all required fields" })
        .send();
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ "error message": "Password should be at least 6 characters" })
        .send();
    }
    if (password != verifypassword) {
      res
        .status(400)
        .json({ "error message": "Password does not match verified Password" });
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ "error message": "Account with this email exist" });
    }

    //hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // console.log("encrypted password:" + passwordHash);

    //save new user
    const isAdmin = false;
    const newUser = new user({ email, username, passwordHash, isAdmin });
    const saveuser = await newUser.save();
    const savedUser = await user.findOne({ email });

    //sign the token
    const token = jwt.sign(
      {
        user: saveuser._id,
      },
      process.env.JWT_SECRET
    );
const userPayload ={userD:savedUser, token:token};
  
    //use cookies

    res.send(userPayload);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

//login user
router.post("/updateUserStatus/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    var newStatus = { $set: { status: 1 } };
    var myQuery = { _id: id };
    const updateStatus = await user.updateOne(
      myQuery,
      newStatus,
      function (err, res) {
        if (err) throw err;
        console.log("response sent");

        // db.close();
      }
    );
    res.status(200).json(updateStatus);
    // res.send("hi")
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ "error message": "please enter all required fields" })
        .send();
    }
    //verify if email is registered
    var existinguser = await user.findOne({ email });
    if (!existinguser) {
      res
        .status(401)
        .json({ "error message": "Wrong Email or Password" })
        .send();
    }
    //verify if password is correct
    const passwordcorrect = await bcrypt.compare(
      password,
      existinguser.passwordHash
    );

    if (!passwordcorrect) {
      res
        .status(401)
        .json({ "error message": "Wrong Email or Password" })
        .send();
    }

    //sign token
    const token = jwt.sign(
      {
        user: existinguser._id,
      },
      process.env.JWT_SECRET
    );
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: "mail.apexwavefintech.com",
    host: "mail.apexwavefintech.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "account@apexwavefintech.com", // generated ethereal user
      pass: "tN;;p}x~zz4S", // generated ethereal password
    },
    tls: {
  rejectUnauthorized: false
}
  });

  // send mail with defined transport object
   var mailOptions = {
    from: '"Apexwave Login" <invest@apexwavefintech.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Login Confirmed", // Subject line
    text: "You have logged into your apexwavefintech account", // plain text body
  //  html: "<b>You have logged into your apexwavefintech account</b>", // html body
  };
  transporter.sendMail(mailOptions, function (error, info) {
                      if (error) {
                             console.log(error);
                       } else {
                         console.log('Email sent: ' + info.response);
                       }
               });
 

const userPayload ={userD:existinguser, token:token};

    //use cookies
    res.send(userPayload);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

//logout

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send("logout Complete");
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);
    jwt.verify(token, process.env.JWT_SECRET);

    res.json(true);
  } catch (err) {
    res.json(false);
  }
});
module.exports = router;
