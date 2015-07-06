require 'sinatra'
require 'sinatra/respond_with'
require 'sequel'
require 'yaml'

require './app/config/config'

module Onyx
  class App < Sinatra::Base
    configure do
      register Sinatra::RespondWith
      respond_to :json

      use Rack::Static, :urls => ['/bower_components'],
                        :index => './views/index.html'

      DB = Sequel.connect(
        :adapter => 'mysql',
        :host => Onyx.CONFIG[:database][:host],
        :port => Onyx.CONFIG[:database][:port],
        :database => Onyx.CONFIG[:database][:database],
        :user => Onyx.CONFIG[:database][:username],
        :password => Onyx.CONFIG[:database][:password]
      )

      Sequel.extension :migration, :core_extensions
      Sequel::Migrator.apply DB, './app/migrations'

      require './app/models/base'
    end
=begin
    get '/' do
        content_type 'text/html'
        send_file './app/frontend/index.html'
    end
=end
  end
end
