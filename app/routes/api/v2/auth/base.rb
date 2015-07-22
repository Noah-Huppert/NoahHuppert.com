require './app/routes/api/v2/auth/google'

module Onyx
    module Routes
        module Api
            module V2
                module Auth
                    class Base < Route
                        use Google
                    end# Base
                end# Auth
            end# V2
        end# Api
    end# Routes
end# Onyx
