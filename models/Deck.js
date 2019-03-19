const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  colorIdentity: {
    G: {
      type: 'Boolean',
      required: true
    },
    R: {
      type: 'Boolean',
      required: true
    },
    B: {
      type: 'Boolean',
      required: true
    },
    U: {
      type: 'Boolean',
      required: true
    },
    W: {
      type: 'Boolean',
      required: true
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  cardList: {
    type: ['Mixed'],
    required: true
  }
});

module.exports = Deck = mongoose.model('deck', DeckSchema);
