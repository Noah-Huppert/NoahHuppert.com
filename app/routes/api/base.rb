require './app/routes/api/v2/base'

module Onyx
    module Routes
        module Api
            class Base < Route
                use V2::Base
            end# Base
        end# Api
    end# Routes
end# Onyx
