class CreateTripDates < ActiveRecord::Migration[5.1]
  def change
    create_table :trip_dates do |t|
      t.datetime :trip_date
      t.belongs_to :field_trip

      t.timestamps
    end
  end
end
