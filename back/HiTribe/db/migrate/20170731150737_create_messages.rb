class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :message_text
      t.integer :user_id
      t.integer :group_id
      t.boolean :is_post, default: false

      t.timestamps
    end
  end
end
