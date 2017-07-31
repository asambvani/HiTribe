class UsersController < ApplicationController
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

end
