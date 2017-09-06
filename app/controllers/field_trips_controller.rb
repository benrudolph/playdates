class FieldTripsController < ApplicationController
  def show
    params.permit(:id)
    @field_trip = FieldTrip.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: { field_trip: @field_trip } }
    end
  end

  def index
    @field_trips = FieldTrip.all
    respond_to do |format|
      format.html
      format.json { render json: { field_trips: @field_trips } }
    end
  end
end
