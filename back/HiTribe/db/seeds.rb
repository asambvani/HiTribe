# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

100.times do |i|
  User.create(username: Faker::Internet.user_name, first_name: Faker::Name.first_name, last_name: Faker::Name.last_name)
end

isPost = [true,false]
5.times do |i|
  group = Group.create(name:Faker::Ancient.hero)

  (rand(10)+1).times do |j|
    group.users << User.all.sample
  end

  (rand(20)+1).times do |j|
    message = Message.new(message_text:Faker::FamilyGuy.quote, is_post:isPost.sample)
    group.users.sample.messages << message
    group.messages << message
  end

end
