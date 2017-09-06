class AddImageUrlToTrip < ActiveRecord::Migration[5.1]
  def change
    add_column :field_trips, :trip_image_url, :string
  end
end
