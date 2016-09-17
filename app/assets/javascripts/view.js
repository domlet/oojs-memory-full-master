// New View instance is initialized with no attributes
function View() {
}
// Give us an array of the card divs (within div#cards)
View.prototype.getCards = function() {
  return $("#cards div");
}
// Use jQuery to grab the Reset button (the only object of this type on the page)
View.prototype.getResetButton = function() {
  return $("input[type='button']");
}
// Sets icons for cards using css!!
View.prototype.setCardFaces = function(card_faces) {
  var that = this;
  // Use jQuery.each() with 'getCards' (which is an array of divs) as argument
  // This turns array into hash with indexes as keys
  $.each(this.getCards(), function(index, card){
    // Execute this block...
    // Select each card div, find the icon tag in html <i>
    // .find("i") is totally jQuery which is why the "i" element is in quotes
    // add the class corresponding to the [index] position (from CARD_FACES)
    $(card).find("i").addClass(card_faces[index]);
  });
}
// Call these two methods
View.prototype.resetGame = function() {
  this.resetCards();
  this.resetScore();
}
// Turn cards back over
View.prototype.resetCards = function() {
  $.each($("#cards div"), function(index, card){
    // Remove the class that makes it white
    $(card).removeClass();
    // Add the class that makes it pink
    $(card).addClass("hidden_card");
    // Remove the class that shows the icon
    $(card).find("i").removeClass();
  });
}
// Use jQuery to reset score on the screen
View.prototype.resetScore = function() {
  $("#score").text(0);
}
// Grab the text within the #score object
// Turn it into a number (Use JavaScript parseInt() Function)
// Add the amount (from argument)
// Update the text within the #score object
View.prototype.updateScore = function(amount) {
  $("#score").text(parseInt($("#score").text()) + amount);
}
// Flips cards up or down
// Pass in args:
  // indexed for cards (one for clicks, two when turning pair back over)
  // class to expose cards OR hide cards
// Set a variable equal to array of card divs
View.prototype.toggleCards = function(card_indexes, newClass) {
  var cards = this.getCards();
  // Use jQuery.each() method with arguments:
  // First argument: the one or two cards we're dealing with...
  // Second argument: anonymous function
    // Anonymous function also has two arguments...
      // First argument: 'index' iterates through the index positions of the 'card_indexes' values
      // Second argument: 'card_index' is the 0-19 index of the card in the divs array
  $.each(card_indexes, function(index, card_index) {
    // We execute a block...
    // Declare variable with value = the div (selected by index position)
    var card = $(cards[card_index]);
    // For that div, remove existing classes and add class (from argument)
    card.removeClass();
    card.addClass(newClass);
  });
}
// See what icon a given card should show (tree, etc.)
View.prototype.getCardClass = function(card_index) {
  // Use jQuery to grab all the cards
  // For the card in question (see arg), find the icon class and return it
  return $(this.getCards()[card_index]).find("i").attr("class");
}
// Hey card, where do you live?
// given a div, determine the index position of that div within an array
View.prototype.getCardLocation = function(card) {
  return this.getCards().index(card);
}
