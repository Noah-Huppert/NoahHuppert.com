require 'sinatra/base'
require 'sinatra/respond_with'
require 'sequel'
require 'dotenv'
require 'omniauth'
require 'omniauth-google-oauth2'

Dotenv.load

require './app/config/config'
require './app/routes/base'

module Onyx
    class App < Sinatra::Base

        configure do
            use Rack::Session::Cookie, :key => 'rack.session',
                                       :domain => Config.CONFIG[:url],
                                       :path => '/',
                                       :expire_after => 1209600,# 2 weeks
                                       :secret => Config.CONFIG[:cookies_secret]

            use OmniAuth::Builder do
                provider :google_oauth2, Config.CONFIG[:api][:v2][:auth][:google][:client_id], Config.CONFIG[:api][:v2][:auth][:google][:client_secret],
                {
                    :name => 'google',
                    :path_prefix => "#{Config.CONFIG[:api][:v2][:root]}/auth",
                    :callback_path => "#{Config.CONFIG[:api][:v2][:root]}/auth/google/callback"
                }
            end

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
        end#configure

        #Register routes
        use Routes::Base
    end# App
end# Onyx
