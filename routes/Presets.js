const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middlewares/auth');

const User = require('../models/user');
const Preset = require('../models/Preset');

router.post('/savenew', auth, async (req, res) => {
  console.log('req body: ', req.tokenUser);

  let { name, state } = req.body;
  if (req.tokenUser) {
    console.log('REQ BODY: ', req.body);

    const { userId } = req.tokenUser;
    //   state = JSON.stringify(state);
    //     const newPreset = new Preset({
    //       name,
    //       state,
    //       userId,
    //     });
    //     newPreset
    //       .save()
    //       .then((result) => res.send(result))
    //       .catch((err) => console.log('preset save error: ', err));
  }
});

// router.get('/load', auth, async (req, res) => {
//   console.log('REQ TOKEN USER: ', req.tokenUser);
//   const { userId } = req.tokenUser;
//   const foundPresets = await Preset.find({ userId });
//   console.log('found presets: ', foundPresets);
//   res.send(foundPresets);
// });

module.exports = router;
