const mongoose = require('mongoose');

const presetSchema = {
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   userId: {type: String, required: true},
  //
};

module.exports = mongoose.model('Preset', presetSchema);
