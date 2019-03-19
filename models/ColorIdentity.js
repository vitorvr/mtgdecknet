const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ColorIdentityScheme = new Schema({
  R: {
    type: Boolean,
    required: true
  },
  G: {
    type: Boolean,
    required: true
  },
  B: {
    type: Boolean,
    required: true
  },
  U: {
    type: Boolean,
    required: true
  },
  W: {
    type: Boolean,
    required: true
  }
});

module.exports = ColorIdentity = mongoose.model(
  'colorIdentity',
  ColorIdentityScheme
);
