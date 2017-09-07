class CreateReservations < ActiveRecord::Migration[5.1]
  def change
    create_table :reservations do |t|
      t.string :email
      t.string :name
      t.integer :number_of_children
      t.belongs_to :trip_date

      t.timestamps
    end
  end
end
