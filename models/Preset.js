const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: { type: String, required: true },
    state: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Preset', presetSchema);
