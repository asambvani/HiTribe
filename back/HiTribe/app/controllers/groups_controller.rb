class GroupsController < ApplicationController

  def messages
    group_id = params[:id]
    @messages = Group.find(group_id).messages
    render json: @messages
  end

end
