module Onyx
    module Routes
        class Route < Sinatra::Base
            configure do
                use Rack::Session::Cookie, :key => 'rack.session',
                                           :path => '/',
                                           :expire_after => Config.CONFIG[:cookies][:expire_after],
                                           :secret => Config.CONFIG[:cookies][:secret]

                register Sinatra::RespondWith
                respond_to :json
            end
        end# Route
    end# Routes
end# Onyx
