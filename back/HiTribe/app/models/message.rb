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
  require 'net/http'
  require 'json'

  has_many :comments
  has_many :likes
  belongs_to :user
  belongs_to :group

  def self.check_giphy(text)
    if text.include?("/giphy")
      giphy_text = text.split("/giphy")[-1].split(" ").join("+")
      giphy_url(giphy_text)
    else
      text
    end
  end

  def self.giphy_url(search_words)
    url = "https://api.giphy.com/v1/gifs/random?api_key=3ad9acb2b6a24ecea4a80198611baef0&tag=" + search_words + "&rating=G"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    data = JSON.parse(response)
    data["data"]["image_url"]
  end
end
