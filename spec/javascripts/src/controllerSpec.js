describe("Controller", function(){

  beforeEach(function(){
    $cards = affix("#cards");
    for(var i = 0; i < 20; i++) {
      $cards.affix(".hidden_card p i");
    }

    affix("input[type=button]");
    affix("span#score");
  });

  it("binds the click event to each card", function(){
    var controller = new Controller().initialize();
    expect($("#cards div")).toHandle("click");
  });

  it("binds the click event to the reset button", function(){
    var controller = new Controller().initialize();
    expect($("input[type='button']")).toHandle("click");
  });
});