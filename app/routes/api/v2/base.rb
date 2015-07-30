require './app/routes/api/v2/helpers/authetication_helper'

require './app/routes/api/v2/posts'
require './app/routes/api/v2/users'
require './app/routes/api/v2/api_access_tokens'

require './app/routes/api/v2/auth/base'

module Onyx
    module Routes
        module Api
            module V2
                class Base < Route
                    use Posts
                    use Users
                    use ApiAccessTokens

                    use Auth::Base
                end# Base
            end# V2
        end# Api
    end# Routes
end# Onyx
