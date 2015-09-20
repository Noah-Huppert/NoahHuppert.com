require 'sinatra/base'
require 'sinatra/respond_with'

require 'sequel'

require './app/config/config'
require './app/routes/base'

module Onyx
    class App < Sinatra::Base
        configure do
            use Rack::Static, :urls => ['/css', '/js'], :root => './public'
            use Rack::Static, :urls => ['/components', '/pages', '/includes'], :root => './views'
            use Rack::Static, :urls => ['/bower_components'],
                              :index => './views/index.html'

            DB = Sequel.connect(
                :adapter => 'postgres',
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
        end# configure

        # Register routes
        use Routes::Base

        # Start Threads
        require './app/threads/base'
    end# App
end# Onyx
