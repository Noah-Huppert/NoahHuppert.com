module Onyx
    module Routes
        module Api
            module V2
                class ApiAccessTokens < Route
                    helpers Helpers

                    get "#{Config.CONFIG[:api][:v2][:root]}/api_access_tokens" do
                        request_info = has_permissions!([
                            Models::ApiAccessToken.permissions[:self][:get],
                            Models::User.permissions[:self][:get]
                        ])

                        user = request_info[:user]
                        api_access_token = request_info[:access_token]

                        respond_with({
                            'user' => user,
                            'api_access_token' => api_access_token
                        })
                    end
                end# ApiAccessTokens
            end# V2
        end# Api
    end# Routes
end# Onyx
