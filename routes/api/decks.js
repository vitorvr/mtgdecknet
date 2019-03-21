const express = require('express');
const router = express.Router();

const Deck = require('../../models/Deck');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   GET api/deck
// @desc    Get all decks by user
// @access  Private
router.get('/', auth, (req, res) => {
  Deck.find().then(decks => res.status(200).json(decks));
});

// @route   POST api/deck
// @desc    Create new deck
// @access  Private
router.post('/', auth, async (req, res) => {
  let cardList = createCardList(req.body.cardlist);
  let colorIdentity = checkColorIdentity(req.body.cardlist);
  let userProfile = await getUser(req.user.id);

  let newDeck = new Deck({
    name: req.body.deckname,
    userProfile,
    colorIdentity,
    cardList
  });

  newDeck
    .save()
    .then(deck => res.status(200).json(deck))
    .catch(err => console.log(err));
});

const createCardList = cardlist => {
  let finalCardlist = [];

  for (let item of cardlist) {
    let card = {};

    card.quantity = item.quantity;
    card.name = item.card.name;
    card.names = item.card.names ? item.card.names : undefined;
    card.cmc = item.card.cmc;
    card.manaCost = item.card.manaCost;
    card.colors = item.card.colors;
    card.colorIdentity = item.card.colorIdentity;
    card.type = item.card.type;
    card.types = item.card.types ? item.card.types : undefined;
    card.rarity = item.card.rarity;
    card.set = item.card.set;
    card.setName = item.card.setName;
    card.imageUrl = item.card.imageUrl;
    card.multiverseid = item.card.multiverseid;
    //MTG Arena
    card.mtgarena = `${item.quantity} ${item.card.name} (${item.card.set}) ${
      item.card.number
    }`;

    finalCardlist.push(card);
  }
  return finalCardlist;
};

const checkColorIdentity = cardlist => {
  const colorIdentity = {
    G: false,
    R: false,
    B: false,
    U: false,
    W: false
  };

  for (let item of cardlist) {
    for (let color of item.card.colorIdentity) {
      if (color === 'G') colorIdentity.G = true;
      if (color === 'R') colorIdentity.R = true;
      if (color === 'B') colorIdentity.B = true;
      if (color === 'U') colorIdentity.U = true;
      if (color === 'W') colorIdentity.W = true;
    }
  }

  return colorIdentity;
};

const getUser = async id => {
  let userProfile = await User.findById(id).select('_id name email');
  return userProfile;
};

module.exports = router;
