class FieldTrip < ApplicationRecord
  belongs_to :user

  has_many :reviews
  has_many :trip_dates
  has_many :active_dates, -> { where('trip_date > ?', DateTime.now) }, class_name: 'TripDate'
end
