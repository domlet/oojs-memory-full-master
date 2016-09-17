class GamesController < ApplicationController

  def create
    game = Game.new
    game.score = params[:score]

    respond_to do |format|
      if game.save
        format.json { render json: game}
      else
        format.json { render json: game.errors}
      end
    end
  end
end