class AddArchivedToFieldTrips < ActiveRecord::Migration[5.1]
  def change
    add_column :field_trips, :archived, :boolean, default: false
  end
end
