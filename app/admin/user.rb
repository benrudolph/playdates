ActiveAdmin.register User do

  permit_params do
    params = [:name, :email, :password, :about, :profile_image_url, :location, :profession]
    params
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :email
      f.input :password
      f.input :is_host
      f.input :about
      f.input :profile_image_url
      f.input :location
      f.input :profession
    end

    f.actions
  end
end
