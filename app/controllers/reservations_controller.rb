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

  def create
    params.permit(:trip_date_id)
    trip_date_id = params[:trip_date_id]

    params.require(:reservation).permit(:name, :email, :number_of_children)

    reservation = Reservation.new({
      name: params[:name],
      email: params[:email],
      number_of_children: params[:number_of_children],
      trip_date_id: trip_date_id
    })

    # TODO: Send email

    if reservation.valid?
      reservation.save
      # Redirect to confirmation page
      respond_to do |format|
        format.html { redirect_to(action: 'confirmation_success') }
        format.json { render json: { reservation: reservation, trip_date: @trip_date } }
      end
    else
      raise 'Invalid Reservation'
    end
  end

  def confirmation_success
    render 'confirmation_success'
  end
end
