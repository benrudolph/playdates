class CaregiversController < ApplicationController
  def index
    @caregivers = User.caregivers

    respond_to do |format|
      format.html
      format.json { render json: { caregivers: @caregivers } }
    end
  end
end

