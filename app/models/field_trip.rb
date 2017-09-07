class FieldTrip < ApplicationRecord
  belongs_to :user

  has_many :reviews
  has_many :trip_dates
end
