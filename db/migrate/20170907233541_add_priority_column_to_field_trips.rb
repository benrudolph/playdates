class AddPriorityColumnToFieldTrips < ActiveRecord::Migration[5.1]
  def change
    add_column :field_trips, :priority, :integer
  end
end
