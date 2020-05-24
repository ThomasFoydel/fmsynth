const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../models/user');

const router = express.Router();

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Preset = require('../models/Preset');

router.post('/savenew', auth, async (req, res) => {
  let { name, state, username } = req.body;
  const { userId } = req.tokenUser;

  const foundUser = await User.findById(userId);
  if (foundUser.presets) {
    if (foundUser.presets.some((preset) => preset.name === name)) {
      return res.send({ err: 'a preset with this name already exists' });
    }
  }
  const newPreset = { author: username, name: name, params: state };
  User.findByIdAndUpdate(
    userId,
    { $push: { presets: newPreset } },
    { new: true }
  )
    .then((updatedUser) => {
      const newArray = [];
      updatedUser.presets.forEach((preset, i) => {
        const presetObj = {
          text: preset.name,
          value: preset.params,
        };
        newArray.push(presetObj);
      });

      const nameOfNewPreset =
        updatedUser.presets[updatedUser.presets.length - 1].name;
      return res.send({ presets: newArray, current: nameOfNewPreset });
    })
    .catch((err) => console.log('save preset error: ', err));
});

// router.get('/load', auth, async (req, res) => {
//   console.log('REQ TOKEN USER: ', req.tokenUser);
//   const { userId } = req.tokenUser;
//   const foundPresets = await Preset.find({ userId });
//   console.log('found presets: ', foundPresets);
//   res.send(foundPresets);
// });

router.post('/update', auth, async (req, res) => {
  let { userId } = req.tokenUser;
  let { state, name } = req.body;

  // User.findByIdAndUpdate(userId,{
  //     $set: {`preset.${name}`: state }
  // })
});
module.exports = router;
