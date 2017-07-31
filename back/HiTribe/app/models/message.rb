# == Schema Information
#
# Table name: messages
#
#  id           :integer          not null, primary key
#  message_text :string
#  user_id      :integer
#  group_id     :integer
#  is_post      :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Message < ApplicationRecord
  has_many :comments
  has_many :likes
  belongs_to :user
  belongs_to :group
end
