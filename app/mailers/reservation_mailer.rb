class ReservationMailer < ApplicationMailer
  default from: 'notification@playdates.me'

  def reservation_email(reservation)
    @field_trip = reservation.trip_date.field_trip
    @reservation = reservation
    mail(
      to: reservation.email,
      subject: "#{reservation.name}, your children are set for a play date!"
    )
  end
end
