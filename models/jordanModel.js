const mongoose = require('mongoose');

const jordanSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    index: true,
    validate: {
      validator: (value) => /^[a-zA-Z0-9\s]+$/.test(value),
      message: 'Invalid characters in the model name.',
    },
  },
  styles: [{ type: String, required: true }],
  releaseYear: { type: Number },
});

const JordanModel = mongoose.model('Jordan', jordanSchema);

module.exports = JordanModel;
