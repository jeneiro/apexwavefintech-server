const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

//connect to server
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server started on : ${PORT}`);
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

//app.get("/test", (req, res)=>{ res.send("it works!")})

//connect to Mongo DB
mongoose.connect(
  process.env.MDB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("MongoDB Connected!");
  }
);

//setup middleware
//app.use(express.static('./'))
app.use("/auth", require("./routers/userRouter"));
app.use("/member", require("./routers/memberRouter"));
app.use("/transaction", require("./routers/transactionRouter"));
app.use("/commission", require("./routers/commissionRouter"));
app.use("/withdrawal", require("./routers/withdrawalRouter"));
app.use("/profileImage", require("./routers/profileImageRouter"));
app.use("/investment", require("./routers/investmentRouter"));
app.use("/profit", require("./routers/profitRouter"));
