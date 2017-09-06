class AddReferenceToFieldTrip < ActiveRecord::Migration[5.1]
  def change
    add_reference :field_trips, :user, foreign_key: true
    add_column :field_trips, :requirements, :text, array: true, default: [].to_yaml
  end
end
