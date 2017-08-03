# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  username   :string
#  first_name :string
#  last_name  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
  has_many :comments
  has_many :posts, -> {where is_post: true}, class_name: "Message"

  #Has many friend_requests if the other accepts then they both become friends
  #If the other rejects then it goes away and it goes to the rejected
  # has_many :friend_requests, class_name: "User"
  # has_many :friend_rejections, class_name: "User"
  # has_many :friends, class_name: "User"

  has_many :friend_request_relationships, foreign_key: :user_id, class_name: 'Friend'
  has_many :friend_requests, through: :friend_request_relationships, source: :friend_request
  before_save :attach_img


  def friends
    self.friend_requests.select do |user|
      user.friend_requests.include?(self)
    end
  end

  def attach_img
    img = Avatarly.generate_avatar("#{self.first_name} #{self.last_name}", {})
    url = "#{Rails.root}/images/users/#{self.first_name}_#{self.last_name}.png"
    File.open(url, 'wb') do |f|
      f.write img
    end

    self.image_url = url

  end
end
