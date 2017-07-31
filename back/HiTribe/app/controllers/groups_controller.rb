class GroupsController < ApplicationController

  def show
    group_id = params[:id]
    @messages = Group.find(group_id).messages
    render :json @messages
  end

end
