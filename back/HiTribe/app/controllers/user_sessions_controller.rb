class UserSessionsController < ApplicationController
  def login
    @user = User.find_by(username:params[:username])
    if @user
      render json: @user
    else
      render json: {username: nil} # need to catch this scenario in front end
    end
  end
end
