class AddIsHostToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :is_host, :boolean, default: false
  end
end
