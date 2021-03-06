class FieldTripsController < ApplicationController
  def show
    params.permit(:id)
    @google_api_key = Rails.application.secrets[:google_api_key]
    @field_trip = FieldTrip.active.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: { field_trip: @field_trip } }
    end
  end

  def index
    @google_api_key = Rails.application.secrets[:google_api_key]
    @field_trips = FieldTrip.active.order(:priority).all
    respond_to do |format|
      format.html
      format.json { render json: { field_trips: @field_trips } }
    end
  end
end
