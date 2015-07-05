require 'rubygems'
require 'bundler/setup'

require 'sinatra'
require 'sinatra/respond_with'
require 'sequel'
require 'yaml'

require './app/config/base'

module Onyx
  class App < Sinatra::Base
    configure do
      register Sinatra::RespondWith
      respond_to :json

      DB = Sequel.connect(
        :adapter => 'mysql',
        :host => Config.CONFIG['database']['host'],
        :port => Config.CONFIG['database']['port'],
        :database => Config.CONFIG['database']['database'],
        :user => Config.CONFIG['database']['username'],
        :password => Config.CONFIG['database']['password']
      )

      Sequel.extension :migration, :core_extensions
      Sequel::Migrator.apply DB, './app/migrations'

      require './app/models/base'
    end

    get '/' do
      respond_with Config.PERMISSION_GROUPS
      # respond_with ({ :users => Models::User.select(:id).limit(5).offset(5).map(:id) })
    end
  end
end
