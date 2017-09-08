class FieldTrip < ApplicationRecord
  belongs_to :user

  has_many :reviews
  has_many :trip_dates
  has_many :active_dates, -> { where('trip_date > ?', DateTime.now).order(:trip_date) }, class_name: 'TripDate'

  def as_json(options = {})
    json = super(options)
    json[:review_count] = self.reviews.count
    json
  end
end
