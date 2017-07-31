# == Schema Information
#
# Table name: comments
#
#  id           :integer          not null, primary key
#  comment_text :string
#  message_id   :integer
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Comment < ApplicationRecord
  belongs_to :message
  belongs_to :user
end
