require './app/routes/route'

require './app/routes/api/base'

module Onyx
    module Routes
        class Base < Route
            use Api::Base
        end# Base
    end# Routes
end# Onyx
