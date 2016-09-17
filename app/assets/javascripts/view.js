function View() {
}

View.prototype.getCards = function() {
  return $("#cards div");
}

View.prototype.getResetButton = function() {
  return $("input[type='button']");
}

View.prototype.setCardFaces = function(card_faces) {
  var that = this;
  $.each(this.getCards(), function(index, card){
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
// jQuery each method iterates through each and takes arguments
View.prototype.toggleCards = function(card_indexes, newClass) {
  var cards = this.getCards();
  debugger
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
