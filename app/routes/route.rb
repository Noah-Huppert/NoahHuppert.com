module Onyx
    module Routes
        class Route < Sinatra::Base
            configure do
                register Sinatra::RespondWith
                respond_to :json
            end
        end# Route
    end# Routes
end# Onyx
