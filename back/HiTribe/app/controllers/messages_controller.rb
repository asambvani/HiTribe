class MessagesController < ApplicationController
  def create
    # params
    # message_text, user_id, group_id
    # create_message and associate with user & group
    text = params[:text]
    group_id = params[:currentGroup]
    user_id = params[:currentUser]
    @message = Message.create(message_text:text, is_post:false)
    User.find(user_id).messages << @message
    Group.find(group_id).messages << @message
  end
end
