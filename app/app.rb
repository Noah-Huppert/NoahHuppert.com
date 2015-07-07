require 'sinatra'
require 'sinatra/respond_with'
require 'sequel'
require 'yaml'
require 'better_errors'

require './app/config/config'

module Onyx
  class App < Sinatra::Base
    configure :development do
      use BetterErrors::Middleware
      # you need to set the application root in order to abbreviate filenames
      # within the application:
      BetterErrors.application_root = File.expand_path('..', __FILE__)
    end

    configure do
      register Sinatra::RespondWith
      respond_to :json

      use Rack::Static, :urls => ['/css', '/js'], :root => './public'
      use Rack::Static, :urls => ['/components', '/pages'], :root => './views'
      use Rack::Static, :urls => ['/bower_components'],
                        :index => './views/index.html'

      DB = Sequel.connect(
        :adapter => 'mysql',
        :host => Onyx::Config.CONFIG[:database][:host],
        :port => Onyx::Config.CONFIG[:database][:port],
        :database => Onyx::Config.CONFIG[:database][:database],
        :user => Onyx::Config.CONFIG[:database][:username],
        :password => Onyx::Config.CONFIG[:database][:password]
      )

      Sequel.extension :migration, :core_extensions
      Sequel::Migrator.apply DB, './app/migrations'

      require './app/models/base'

      # Load permission_groups after models are set up
      require './app/config/permission_groups'
    end
  end
end
