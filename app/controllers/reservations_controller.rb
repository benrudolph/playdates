class ReservationsController < ApplicationController
  def new
    params.permit(:trip_date_id)

    @trip_date = TripDate.find(params[:trip_date_id])
    @field_trip = @trip_date.field_trip

    respond_to do |format|
      format.html
      format.json { render json: { trip_date: @trip_date, field_trip: @field_trip } }
    end
  end
end
