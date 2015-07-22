require 'uri'

module Onyx
    module Routes
        module Api
            module V2
                module Auth
                    class Google < Route
                        # Starts Google OAuth2 flow
                        get "#{Config.CONFIG[:api][:v2][:root]}/auth/google/connect" do
                            csrft = SecureRandom.hex 16
                            session[:csrft] = csrft

                            puts "/connect Session #{session[:csrft]}"

                            redirect_uri = URI::HTTPS.build({
                                :host => 'accounts.google.com',
                                :path => '/o/oauth2/auth'
                            })

                            redirect_uri.query = URI.encode_www_form({
                                'response_type' => 'code',
                                'client_id' => Config.CONFIG[:api][:v2][:auth][:google][:client_id],
                                'redirect_uri' => "#{Config.CONFIG[:url]}#{Config.CONFIG[:api][:v2][:root]}/auth/google/callback",
                                'scope' => 'profile',
                                'state' => csrft,
                                'access_type' => 'offline'
                            })

                            redirect redirect_uri
                        end

                        get "#{Config.CONFIG[:api][:v2][:root]}/auth/google/callback" do
                            puts "/callback Session #{session[:csrft]}"

                            respond_with ({
                                :code => params[:code],
                                :request_csrft => params[:state],
                                :session_csrft => session[:csrft],
                                :secure? => (params[:state] == session[:csrft])
                            })

                            session[:csrft] = nil
                        end
                    end# Google
                end# Auth
            end# V2
        end# Api
    end# Routes
end# Onyx
