const router = require("express").Router();
const Image = require("../models/profileimageModel");

//const { findOne } = require("../models/userModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { user_id, photo } = req.body;

    const existingPhoto = await Image.findOne({ user_id });
    if (existingPhoto) {
      var newPhoto = { $set: { photo: photo } };

      const updatePhoto = await Image.updateOne(
        { user_id: user_id },
        newPhoto,
        function (err, res) {
          if (err) throw err;
        }
      );

      res.json(updatePhoto);
    } else {
      const newProfileImage = new Image({ user_id, photo });
      const saveImage = await newProfileImage.save();
      res.json(saveImage);
    }
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const profileImage = await Image.find({ user_id: id });

    res.json(profileImage);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
