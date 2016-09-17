class GamesController < ApplicationController

# POST to '/games'
  def create
    game = Game.new
    game.score = params[:score]

    # 'respond_to' is like 'xhr'
    # Could this fail?
    respond_to do |format|
      if game.save
        format.json { render json: game}
      else
        format.json { render json: game.errors}
      end
    end
  end

end
