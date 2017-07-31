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
  has_many :posts, -> {where is_post: true}, class_name: "Message"
end
