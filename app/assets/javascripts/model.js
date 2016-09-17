// New Game instance is initialized with these attributes.
function Game() {
  this._score = 0; // A score of 0
  this._cards = []; // Empty array of cards
  this._current_cards = []; // Empty array of current cards
  this._remaining_card_count = 20;
}

Game.prototype.CARD_FACES = ["fa fa-5x fa-camera-retro",
  "fa fa-5x fa-flag",
  "fa fa-5x fa-paper-plane",
  "fa fa-5x fa-leaf",
  "fa fa-5x fa-heart",
  "fa fa-5x fa-tree",
  "fa fa-5x fa-umbrella",
  "fa fa-5x fa-space-shuttle",
  "fa fa-5x fa-star",
  "fa fa-5x fa-music"
];

Game.prototype.load = function() {
  this.setCards(this.CARD_FACES.concat(this.CARD_FACES));
  this.getCards().shuffle();
}

Game.prototype.getCurrentCards = function() {
  return this._current_cards;
}

Game.prototype.removePairFromCount = function() {
  this.setRemainingCardCount(this.getRemainingCardCount() - 2);
}

Game.prototype.getRemainingCardCount = function() {
  return this._remaining_card_count;
}

Game.prototype.setRemainingCardCount = function(count) {
  return this._remaining_card_count = count;
}

Game.prototype.addCurrentCard = function(card) {
  this._current_cards.push(card);
}

Game.prototype.clearCurrentCards = function() {
  this._current_cards = [];
}

Game.prototype.saveIfFinished = function() {
  if(this.getRemainingCardCount() == 0) {
    this.saveGame();
  }
}
Game.prototype.processMatch = function() {
  this.clearCurrentCards();
  this.removePairFromCount();
  this.saveIfFinished();
}

Game.prototype.updateScore = function(amount) {
  this._score += amount;
}

Game.prototype.getCards = function() {
  return this._cards;
}

Game.prototype.setCards = function(cards) {
  this._cards = cards;
}

Game.prototype.saveGame = function() {
  $.post("/games", {"score": this._score}, function(response) {
    console.log(response)
  }, "JSON");
}

Array.prototype.shuffle = function() {

  var counter = this.length, temp, index;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = this[counter];
    this[counter] = this[index];
    this[index] = temp;
  }
}
