require 'uri'
require 'net/http'
require 'json'

module Onyx
    module Routes
        module Api
            module V2
                module Auth
                    module Helpers
                        module GoogleOAuth
                            # Exchanges a OAuth code for an access token using
                            # the Google Apis
                            #
                            # @param code [String] OAuth code
                            # @return [ProviderAccessToken] A provider access
                            #   token constructed from the Google Apis response
                            def self.exchange_code_for_access_token(code)
                                code_exchange_uri = URI::HTTPS.build({
                                    :host => 'www.googleapis.com',
                                    :path => '/oauth2/v3/token'
                                })

                                code_exchange_response = Net::HTTP.post_form(code_exchange_uri,
                                    'code' => code,
                                    'client_id' => Config.CONFIG[:api][:v2][:auth][:google][:client_id],
                                    'client_secret' => Config.CONFIG[:api][:v2][:auth][:google][:client_secret],
                                    'redirect_uri' => "#{Config.CONFIG[:url]}#{Config.CONFIG[:api][:v2][:root]}/auth/google/callback",
                                    'grant_type' => 'authorization_code'
                                )

                                if code_exchange_response.code == "200"
                                    body = JSON.parse(code_exchange_response.body)

                                    # Create provider access token
                                    provider_access_token = Models::ProviderAccessToken.new

                                    provider_access_token.provider = Models::ProviderAccessToken.providers[:google]
                                    provider_access_token.access_token = body['access_token']
                                    provider_access_token.refresh_token = body['refresh_token']
                                    provider_access_token.expires_on = DateTime.now + Rational(body['expires_in'].to_i, 86400)# 86400 seconds in a day

                                    return provider_access_token
                                else
                                    return nil
                                end
                            end# self.exchange_code_for_access_token

                            # Retrieves user information for the provided access
                            # token using the Google people.get Api.
                            #
                            # @param access_token [String] Google Api access token
                            # @return [User] User constructed from Google Apis
                            #   response
                            def self.retrieve_access_token_owner_info(access_token)
                                owner_info_uri = URI::HTTPS.build({
                                    :host => 'www.googleapis.com',
                                    :path => '/plus/v1/people/me'
                                })

                                owner_info_request = Net::HTTP::Get.new owner_info_uri
                                owner_info_request['Authorization'] = "Bearer #{access_token}"

                                http = Net::HTTP.new owner_info_uri.hostname, owner_info_uri.port
                                http.use_ssl = true

                                owner_info_response = http.start do |http|
                                    http.request owner_info_request
                                end

                                if owner_info_response.code == "200"
                                    body = JSON.parse owner_info_response.body

                                    user = Models::User.new

                                    user.first_name = body['name']['givenName']
                                    user.last_name = body['name']['familyName']
                                    user.email = body['emails'][0]['value']
                                    user.avatar_uri = body['image']['url']

                                    return user
                                else
                                    return nil
                                end
                            end# self.retrieve_access_token_owner_info
                        end# Google
                    end# Helpers
                end# Auth
            end# V2
        end# Api
    end# Routes
end# Onyx
