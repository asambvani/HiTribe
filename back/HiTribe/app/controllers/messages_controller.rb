class MessagesController < ApplicationController
  def create
    # params
    # message_text, user_id, group_id
    # create_message and associate with user & group
    text = params[:text]
    group_id = params[:currentGroup]
    user_id = params[:currentUser]
    is_post = params[:isPost]
    @message = Message.create(message_text:text, is_post:is_post)
    User.find(user_id).messages << @message
    Group.find(group_id).messages << @message
  end

  def comment
    text = params[:text]
    @comment = Comment.new(comment_text:text)
    Message.find(params[:id]).comments << @comment
    User.find(params[:currentUser]).comments << @comment
  end
end
