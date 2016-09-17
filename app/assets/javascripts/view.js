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
    //
    $(card).find("i").addClass(card_faces[index]);
  });
}

View.prototype.resetGame = function() {
  this.resetCards();
  this.resetScore();
}

View.prototype.resetCards = function() {
  $.each($("#cards div"), function(index, card){
    $(card).removeClass();
    $(card).addClass("hidden_card");
    $(card).find("i").removeClass();
  });
}

View.prototype.resetScore = function() {
  $("#score").text(0);
}

View.prototype.updateScore = function(amount) {
  $("#score").text(parseInt($("#score").text()) + amount);
}
// Use jQuery.each() method with arguments
View.prototype.toggleCards = function(card_indexes, newClass) {
  var cards = this.getCards();
  $.each(card_indexes, function(index, card_index) {
    var card = $(cards[card_index]);
    card.removeClass();
    card.addClass(newClass);
  });
}

View.prototype.getCardClass = function(card_index) {
  return $(this.getCards()[card_index]).find("i").attr("class");
}

View.prototype.getCardLocation = function(card) {
  return this.getCards().index(card);
}
