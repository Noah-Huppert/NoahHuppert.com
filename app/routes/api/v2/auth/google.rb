module Onyx
    module Routes
        module Api
            module V2
                module Auth
                    class Google < Route
                        helpers Helpers

                        # Starts Google OAuth2 flow
                        get "#{Config.CONFIG[:api][:v2][:root]}/auth/google/connect" do
                            # Handle Onyx redirect_uri, will redirect to this uri once flow is complete
                            onyx_redirect_uri = Config.CONFIG[:url]

                            if !params[:redirect_uri].nil?
                                onyx_redirect_uri = params[:redirect_uri]
                            end

                            session[:onyx_redirect_uri] = onyx_redirect_uri

                            # Google flow
                            csrft = SecureRandom.hex 16
                            session[:csrft] = csrft

                            redirect_uri = URI::HTTPS.build({
                                :host => 'accounts.google.com',
                                :path => '/o/oauth2/auth'
                            })

                            redirect_uri.query = URI.encode_www_form({
                                'response_type' => 'code',
                                'client_id' => Config.CONFIG[:api][:v2][:auth][:google][:client_id],
                                'redirect_uri' => "#{Config.CONFIG[:url]}#{Config.CONFIG[:api][:v2][:root]}/auth/google/callback",
                                'scope' => 'profile https://www.googleapis.com/auth/userinfo.email',
                                'state' => csrft,
                                'access_type' => 'offline',
                                'approval_prompt' => 'force'
                            })

                            redirect redirect_uri
                        end

                        get "#{Config.CONFIG[:api][:v2][:root]}/auth/google/callback" do
                            # Check for google error
                            if !params[:error].nil?
                                onyx_api_redirect Config.CONFIG[:api][:v2][:auth][:google][:errors][:google_retrieve_oauth_code_error]
                            end

                            # Check csrft
                            if params[:state] != session[:csrft]
                                onyx_api_redirect Config.CONFIG[:api][:v2][:auth][:google][:errors][:insecure_state]
                            end

                            session[:csrft] = nil

                            # Get provider access token
                            retrieved_provider_access_token = GoogleOAuth.exchange_code_for_access_token params[:code]

                            if retrieved_provider_access_token.nil?
                                onyx_api_redirect Config.CONFIG[:api][:v2][:auth][:google][:errors][:google_retrieve_oauth_token_error]
                            end

                            # Get user from access token
                            retrieved_user = GoogleOAuth.retrieve_access_token_owner_info retrieved_provider_access_token.access_token

                            if retrieved_user.nil?
                                onyx_api_redirect Config.CONFIG[:api][:v2][:auth][:google][:errors][:google_retrieve_access_token_owner_info_error]
                            end

                            db_user = Models::User.where(:email => retrieved_user.email).select(:id).first

                            if db_user.nil?
                                retrieved_user.permission_group = :viewer
                                db_user = retrieved_user.save
                            else# Else update current
                                db_user.first_name = retrieved_user.first_name
                                db_user.last_name = retrieved_user.last_name
                                db_user.avatar_uri = retrieved_user.avatar_uri

                                db_user.save_changes
                            end

                            # Update or create provider access token
                            db_provider_access_token = Models::ProviderAccessToken.where(
                                :user_id => db_user.id,
                                :provider => Models::ProviderAccessToken.providers[:google]
                            ).first

                            if db_provider_access_token.nil?
                                retrieved_provider_access_token.user_id = db_user.id
                                db_provider_access_token = retrieved_provider_access_token.save
                            else# Else update current
                                db_provider_access_token.access_token = retrieved_provider_access_token.access_token
                                db_provider_access_token.refresh_token = retrieved_provider_access_token.refresh_token
                                db_provider_access_token.expires_on = retrieved_provider_access_token.expires_on

                                db_provider_access_token.save_changes
                            end

                            # Update or create api access token
                            db_api_access_token = Models::ApiAccessToken.where(:user_id => db_user.id).first

                            if db_api_access_token.nil?
                                db_api_access_token = Models::ApiAccessToken.generate
                                db_api_access_token.user_id = db_user.id
                                db_api_access_token.save
                            else# Else update
                                db_api_access_token.expires_on = DateTime.now + 14
                                db_api_access_token.save_changes
                            end

                            cookies[:access_token] = db_api_access_token.access_token

                            onyx_api_redirect
                        end
                    end# Google
                end# Auth
            end# V2
        end# Api
    end# Routes
end# Onyx
