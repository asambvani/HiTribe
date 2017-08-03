class UsersController < ApplicationController

  def show
    @messages = group.messages
    render json: @messages
  end

  def groups
    @groups = User.find(params[:id]).groups
    render json: @groups
  end

  def create
    @user = User.create(user_params)
  end

  def create_friend
    @user = User.find(params[:id])
    @user.friend_requests << User.find_by(username:  params[:friend_name]) if (User.find_by(username: params[:friend_name]))
    render json: @user
  end

  def friends
    @user = User.find(params[:id])
    render json: @user.friends
  end

  private

  def user_params
    params.require(:user).permit(:username, :first_name, :last_name)
  end

end
