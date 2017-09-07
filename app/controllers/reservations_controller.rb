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

    params.require(:reservation).permit(:name, :email, :number_of_children, :special_requests, :parent_present)

    reservation = Reservation.new({
      name: params[:reservation][:name],
      email: params[:reservation][:email],
      number_of_children: params[:reservation][:number_of_children],
      special_requests: params[:reservation][:special_requests],
      parent_present: params[:reservation][:parent_present] == "on",
      trip_date_id: trip_date_id
    })

    # TODO: Send email

    if reservation.valid?
      reservation.save
      ReservationMailer.reservation_email(reservation)
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
