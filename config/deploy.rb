# config valid only for current version of Capistrano
lock "3.9.0"

set :application, "playdates"
set :repo_url, "git@github.com:benrudolph/playdates.git"
set :migration_role, :app

set :rbenv_type, :user
set :rbenv_ruby, File.read('.ruby-version').strip

set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails}
set :rbenv_roles, :all # default value

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", "node_modules"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 3

after 'bundler:install', 'rbenv:vars'
after 'deploy', 'system:restart'

namespace :rbenv do
  task :vars do
    on roles(:app) do
      within release_path do
        execute "echo 'RAILS_MASTER_KEY=#{File.read('config/secrets.yml.key')}' > #{release_path}/.rbenv-vars"
        execute "echo 'RAILS_MASTER_KEY=#{File.read('config/secrets.yml.key')}' > #{release_path}/config/secrets.yml.key"
      end
    end
  end
end

namespace :system do
  task :restart do
    on roles(:app) do
      execute :sudo, "service unicorn_playdates stop"
      execute :sudo, "service unicorn_playdates start"
    end
  end
end
