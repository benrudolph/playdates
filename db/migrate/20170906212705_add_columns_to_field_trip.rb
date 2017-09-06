class AddColumnsToFieldTrip < ActiveRecord::Migration[5.1]
  def change
    add_column :field_trips, :trip_type, :string
    add_column :field_trips, :duration, :integer
    add_column :field_trips, :notes, :text
    add_column :field_trips, :where, :text
    add_column :field_trips, :what, :text
    add_column :field_trips, :lat, :float
    add_column :field_trips, :lng, :float
    add_column :field_trips, :max_people, :integer
    add_column :field_trips, :cost, :integer
    remove_column :field_trips, :description, :text
  end
end
