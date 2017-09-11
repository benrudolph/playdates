class CaregiversController < ApplicationController
  def index
    @caregivers = User.caregivers

    respond_to do |format|
      format.html
      format.json { render json: { caregivers: @caregivers } }
    end
  end

  def show
    begin
      @caregiver = User.caregivers.find(caregiver_params[:id])
    rescue ActiveRecord::RecordNotFound
      not_found
    end

    respond_to do |format|
      format.html
      format.json { render json: { caregiver: @caregiver } }
    end
  end

  def caregiver_params
    params.permit(:id)
  end
end
