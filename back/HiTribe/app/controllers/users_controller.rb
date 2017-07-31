class UsersController < ApplicationController
  def show
    @messages = group.messages
    render json: @messages
  end
end
