class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.belongs_to :field_trip
      t.belongs_to :user
      t.text :body

      t.timestamps
    end
  end
end
