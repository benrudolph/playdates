class FieldTripsController < ApplicationController
  def show
    @field_trip = FieldTrip.first
    respond_to do |format|
      format.html
      format.json { render json: { field_trip: @field_trip } }
    end
  end
end
