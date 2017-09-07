Rails.application.routes.draw do

  devise_for :users
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  resources :field_trips
  resources :trip_dates do
    resources :reservations
  end
  get '/confirmation_success', to: "reservations#confirmation_success"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'field_trips#index'
end
