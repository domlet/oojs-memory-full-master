// Creates an instance of each
function Controller() {
  this._view = new View();
  this._game = new Game();
};
// Just a getter for the view instance
Controller.prototype.getView = function() {
  return this._view;
}
// Just a getter for the game instance
Controller.prototype.getGame = function() {
  return this._game;
}
// Gets current cards (1 or 2) from Game model
// Passes those cards to the View
// Asks View to run .toggleCards method those cards
Controller.prototype.toggleCards = function(newClass) {
  this.getView().toggleCards(this.getGame().getCurrentCards(), newClass);
}
// Get a deck from the model
// Give the icons from the view
Controller.prototype.setUpGame = function() {
  // Use the Controller method .getGame (just a getter)...
  // Load it up (model method gets a deck and shuffles)
  this.getGame().load();
  // Ask the View instance to set icons for the cards...
  // Only argument: (result of model method that gets all cards)
  this.getView().setCardFaces(this.getGame().getCards());
}
// Ask the View to turn cards back to pink (and set score = 0 )
// Use controller method to start new game
Controller.prototype.resetGame = function() {
  this.getView().resetGame();
  this.setUpGame();
}
// Calls the other two functions
Controller.prototype.updateScore = function(amount) {
  this.getGame().updateScore(amount);
  this.getView().updateScore(amount);
}
// Add card to 'current' array (OR run 'checkPairForMatch')
Controller.prototype.processCard = function(event) {
  // This gets called with each click...
  // Passes '1' as an argument
  // Updates the score on model AND view
  this.updateScore(1);
  // empty until you click on cards (getCurrentCards gets 0, 1, or 2)
  var current_cards = this.getGame().getCurrentCards();
  // IF you haven't yet clicked two cards, add another one
  if(current_cards.length < 2) {
    // Use jQuer 'event.currentTarget' to target the clicked card
    this.addCard(event.currentTarget);
  }
  // If user already clicked two cards, run 'checkPairForMatch'
  if(current_cards.length == 2) {
    this.checkPairForMatch(current_cards);
  }
}
// IF they match, run 'toggleCards' on both to change class (turn gray)
Controller.prototype.processMatch = function() {
  this.toggleCards("matched_card");
  this.getGame().processMatch();
}
// IF they don't match...
// Run 'toggleCards' on both to change class (turn pink)
Controller.prototype.processMismatch = function() {
  this.toggleCards("hidden_card");
  this.getGame().clearCurrentCards(); // and hide the icon
}
// IF user clicked on a second card ('cardLocation' is the index of that card)
Controller.prototype.isSameCardLocation = function (cardLocation) {
  // Remember, 'current_cards' is an array of indexes
  var current_cards = this.getGame().getCurrentCards();
  if(current_cards.length > 0 && (current_cards[0] == cardLocation)) {
    return true;
  }
  // Different card, yay
  return false;
}
// Are we REALLY adding this card to 'current_cards'
Controller.prototype.addCard = function(card) {
  var cardLocation = this.getView().getCardLocation(card);
  // Because if it's the same dang card, NO DEAL.
  if(this.isSameCardLocation(cardLocation))
    return; // Abort mission! (End function.)
  // Otherwise...
  this.getGame().addCurrentCard(cardLocation); // add to current_cards
  this.toggleCards("visible_card"); // show the icon
}
// This runs within 'processCard'...
// ...which passes it an argument containing an array of 2 current cards (used here as 'pairOfCards')
Controller.prototype.checkPairForMatch = function(pairOfCards) {
  var card1 = this.getView().getCardClass(pairOfCards[0]);
  var card2 = this.getView().getCardClass(pairOfCards[1]);
  // Check if they match
  if(card1 == card2) {
    // If they match, run one function (with delay)
    setTimeout(this.processMatch.bind(this), 1000);
  } else {
    // If they do not match, run other function (with delay)
    setTimeout(this.processMismatch.bind(this), 1000);
  }
}
// Only two events in this game: Click Reset, or Click a card
// What the heck is '.bind(this)' and why is it necessary??
Controller.prototype.initialize = function() {
  // You know that button? If it gets clicked...
  this.getView().getResetButton().on("click", this.resetGame.bind(this));
  // When a card gets clicked always do this...
  this.getView().getCards().on("click", this.processCard.bind(this));
  this.setUpGame();
}
