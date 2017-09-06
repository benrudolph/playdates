Rails.application.routes.draw do

  devise_for :users
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  resources :field_trips
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'field_trips#index'
end
