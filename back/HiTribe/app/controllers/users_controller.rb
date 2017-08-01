class UsersController < ApplicationController

  def login
    @user = User.find_by(username:params[:username])
    if @user
      render json: @user
    else

    end
  end

  def show
    @messages = group.messages
    render json: @messages
  end

  def friends

  end

  def groups
    @groups = User.find(params[:id]).groups
    render json: @groups
  end

  def group_users

  end

  def create
    @user = User.create(user_params)
  end

  private

  def user_params
    params.require(:user).permit(:username, :first_name, :last_name)
  end
end
