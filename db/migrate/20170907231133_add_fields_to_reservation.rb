class AddFieldsToReservation < ActiveRecord::Migration[5.1]
  def change
    add_column :reservations, :parent_present, :boolean
    add_column :reservations, :special_requests, :text
  end
end
