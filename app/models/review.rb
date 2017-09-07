class Review < ApplicationRecord
  belongs_to :user
  belongs_to :field_trip
end
