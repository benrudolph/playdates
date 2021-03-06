class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
    render 'index'
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
