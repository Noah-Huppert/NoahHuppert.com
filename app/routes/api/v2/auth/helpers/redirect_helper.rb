module Onyx
    module Routes
        module Api
            module V2
                module Auth
                    module Helpers
                        # Redirect user to specified redirect uri(In session) or
                        # to site root if none is specified. Attaches an error
                        # query param if error is provided
                        #
                        # @param error [String] Optional error to return with
                        def onyx_api_redirect(error = nil)
                            onyx_api_redirect_uri = Config.CONFIG[:url]

                            if !session[:onyx_redirect_uri].nil?
                                onyx_api_redirect_uri = session[:onyx_redirect_uri]
                            end

                            redirect_uri = URI.parse onyx_api_redirect_uri

                            if !error.nil?
                                redirect_uri.query = URI.encode_www_form({
                                    'error' => error
                                })
                            end

                            session[:onyx_redirect_uri] = nil

                            redirect redirect_uri
                        end# onyx_api_redirect
                    end# Helpers
                end# Auth
            end# V2
        end# Api
    end# Routes
end# Onyx
