// Creates an instance of each
function Controller() {
  this._view = new View();
  this._game = new Game();
};
// function returns the property (better than calling it as a property)
Controller.prototype.getView = function() {
  return this._view;
}

Controller.prototype.getGame = function() {
  return this._game;
}

Controller.prototype.toggleCards = function(newClass) {
  this.getView().toggleCards(this.getGame().getCurrentCards(), newClass);
}
// Get
Controller.prototype.setUpGame = function() {
  this.getGame().load();
  this.getView().setCardFaces(this.getGame().getCards());
}

Controller.prototype.resetGame = function() {
  this.getView().resetGame();
  this.setUpGame();
}

Controller.prototype.updateScore = function(amount) {
  this.getGame().updateScore(amount);
  this.getView().updateScore(amount);
}
// creates an array of two (and calls the matching function)
Controller.prototype.processCard = function(event) {

  this.updateScore(1); // need to move this to only update if successful click
  // empty until you click on cards
  var current_cards = this.getGame().getCurrentCards();
  // currentTarget is js method that makes thing you clicked the target
  if(current_cards.length < 2) {
    this.addCard(event.currentTarget);
  }

  if(current_cards.length == 2) {
    this.checkPairForMatch(current_cards);
  }
}

Controller.prototype.processMatch = function() {
  this.toggleCards("matched_card");
  this.getGame().processMatch();
}

Controller.prototype.processMismatch = function() {
  this.toggleCards("hidden_card");
  this.getGame().clearCurrentCards();
}

Controller.prototype.isSameCardLocation = function (cardLocation) {
  var current_cards = this.getGame().getCurrentCards();

  if(current_cards.length > 0 && (current_cards[0] == cardLocation)) {
    return true;
  }

  return false;
}

Controller.prototype.addCard = function(card) {
  var cardLocation = this.getView().getCardLocation(card);

  if(this.isSameCardLocation(cardLocation))
    return;

  this.getGame().addCurrentCard(cardLocation);
  this.toggleCards("visible_card");
}

Controller.prototype.checkPairForMatch = function(pairOfCards) {
  var card1 = this.getView().getCardClass(pairOfCards[0]);
  var card2 = this.getView().getCardClass(pairOfCards[1]);

  if(card1 == card2) {
    setTimeout(this.processMatch.bind(this), 1000);
  } else {
    setTimeout(this.processMismatch.bind(this), 1000);
  }
}
// i think .bind(this) changes 'this' from controller to event
Controller.prototype.initialize = function() {
  this.getView().getResetButton().on("click", this.resetGame.bind(this));
  this.getView().getCards().on("click", this.processCard.bind(this));
  this.setUpGame();
}
