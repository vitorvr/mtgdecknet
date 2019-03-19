const express = require('express');
const router = express.Router();

const Deck = require('../../models/Deck');

router.get('/', (req, res) => {
  Deck.find().then(decks => res.json(decks));
});

router.post('/', (req, res) => {
  let cardList = createCardList(req.body.cardlist);
  let colorIdentity = checkColorIdentity(req.body.cardlist);

  let newDeck = new Deck({
    name: req.body.deckname,
    userId: 'Vitor',
    colorIdentity,
    cardList
  });

  newDeck
    .save()
    .then(deck => res.json(deck))
    .catch(err => console.log(err));
});

const createCardList = cardlist => {
  let finalCardlist = [];

  for (let item of cardlist) {
    let card = {
      mtgarena: {}
    };

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
    card.mtgarena.quantity = item.quantity;
    card.mtgarena.name = item.card.name;
    card.mtgarena.set = item.card.set;
    card.mtgarena.setId = item.card.number;

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

module.exports = router;
