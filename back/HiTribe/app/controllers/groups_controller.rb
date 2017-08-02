class GroupsController < ApplicationController

  def messages
    group_id = params[:id]
    @messages = Group.find(group_id).messages
    render json: @messages.to_json(include: :comments)
  end

  def create
    @group = Group.create(group_params)
    @user = User.find(params[:currentUser])
    @group.users << @user
    render json: @group
  end

  def users
    @users = Group.find(params[:id]).users
    render json: @users
  end

  def add_user

    @group = Group.find(params[:id])
    @user = User.find_by(username:params[:username])
    @group.users << @user
    render json: @group
  end

  private

  def group_params
    params.require(:group).permit(:name)
  end

end
