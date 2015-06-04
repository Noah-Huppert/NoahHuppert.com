require 'rubygems'
require 'bundler/setup'

require 'sinatra'
require 'sequel'
require 'yaml'

module Onyx
  class App < Sinatra::Base
    configure do
      CONFIG = YAML.load_file(File.join(__dir__, 'config.yml'))[ENV['RACK_ENV']]

      DB = Sequel.connect(
        :adapter => 'mysql',
        :host => CONFIG['database']['host'],
        :port => CONFIG['database']['port'],
        :user => CONFIG['database']['username'],
        :password => CONFIG['database']['password']
      )

    end

    get '/' do
      'Endpoint: /'
    end
  end
end
