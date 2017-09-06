class AddFieldsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :about, :text
    add_column :users, :profile_image_url, :string
    add_column :users, :location, :string
    add_column :users, :profession, :string
  end
end
