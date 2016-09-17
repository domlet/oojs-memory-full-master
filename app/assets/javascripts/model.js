// New Game instance is initialized with these attributes.
function Game() {
  this._score = 0;  // Score of zero
  this._cards = []; // Empty array of cards
  this._current_cards = []; // Empty array of current cards
  this._remaining_card_count = 20; // Twenty cards to play
}
// Uses icons from 'font-awesome' in application.css
Game.prototype.CARD_FACES = [
  "fa fa-5x fa-camera-retro",
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
//
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
// A getter function
Game.prototype.getCards = function() {
  return this._cards;
}
// Why does the attribute need to be assigned the value of another variable?
Game.prototype.setCards = function(cards) {
  this._cards = cards;
}
// Use jQuery post() method to send data to the server
// Standard syntax: $(selector).post(URL,data,function(data,status,xhr),dataType)
//      URL = '/games'
//     data = {"score": this._score} // Send as hash
// function = function(response) // ?? Passes (data,status,xhr) and prints it in console
// dataType = "JSON" // Nice JSON object
Game.prototype.saveGame = function() {
  $.post("/games", {"score": this._score}, function(response) {
    console.log(response)
  }, "JSON");
}
// Shuffle method
Array.prototype.shuffle = function() {
  // this variable is an array of three things
  var counter = this.length, temp, index;
  // get random whole numbers
  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = this[counter];
    this[counter] = this[index];
    this[index] = temp;
  }
}
