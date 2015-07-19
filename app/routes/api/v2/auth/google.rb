module Onyx
    module Routes
        module Api
            module V2
                module Auth
                    class Google < Route
                        # OAuth2::Client.new('client_id', 'client_secret', :site => 'https://example.org')
                        # https://github.com/intridea/oauth2
                        oauth_client = OAuth2::Client.new(
                            Config.CONFIG[:api][:v2][:auth][:google][:client_id],
                            Config.CONFIG[:api][:v2][:auth][:google][:client_secret],
                            :site => Config.CONFIG[:api][:v2][:auth][:google][:api_root]
                        )

                        oauth_client.auth_code.authorize_url(
                            :redirect_uri => "#{Config.CONFIG[:url]}/#{Config.CONFIG[:api][:v2][:root]}/auth/google/callback"
                        )

                        # Starts Google OAuth2 flow
                        get "#{Config.CONFIG[:api][:v2][:root]}/auth/google/connect" do

                        end
                    end# Google
                end# Auth
            end# V2
        end# Api
    end# Routes
end# Onyx
