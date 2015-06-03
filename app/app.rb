require 'sinatra'

module Onyx
  class App < Sinatra::Application
    get '/' do
      'Endpoint: /'
    end
  end
end
