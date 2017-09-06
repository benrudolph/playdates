class CreateFieldTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :field_trips do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
