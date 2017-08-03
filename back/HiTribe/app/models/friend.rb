class Friend < ApplicationRecord
  belongs_to :user
  belongs_to :friend_request, foreign_key: 'friend_request_id', class_name: 'User'

  validates :user_id, uniqueness: {scope: :friend_request_id}
end
