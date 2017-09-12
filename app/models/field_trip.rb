class FieldTrip < ApplicationRecord
  belongs_to :user

  scope :active, -> { where(archived: false) }

  has_many :reviews
  has_many :trip_dates
  has_many :active_dates, -> { where('trip_date > ?', DateTime.now).order(:trip_date) }, class_name: 'TripDate'

  def serializable_hash(options = {})
    hash = super(options)
    hash[:review_count] = self.reviews.count
    hash
  end
end
