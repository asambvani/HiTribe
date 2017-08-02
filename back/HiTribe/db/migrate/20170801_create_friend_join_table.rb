class CreateFriendJoinTable < ActiveRecord::Migration[5.1]
    def change
      create_table 'friends' do |t|
        t.integer 'user_id', :null => false
        t.integer 'friend_request_id', :null => false

        t.timestamps null: false
      end
    end
end
