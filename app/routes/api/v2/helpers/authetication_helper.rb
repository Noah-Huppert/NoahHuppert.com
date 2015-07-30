module Onyx
    module Routes
        module Api
            module V2
                module Helpers
                    # Determines if the provided request contains authetication
                    # credentials that have the provided permissions.
                    #
                    # If the provided request does not contain the appropriate
                    # credentials then an http response will be sent with the
                    # status of 401(Unauthorized)
                    #
                    # @param permissions [Array<Symbol>/String] The permissions to check
                    #   for. This maybe be an array of permissions or a single
                    #   permission
                    # @return [Hash] A hash containing the retrieved user(:user)
                    #   and the access_token(:access_token)
                    def has_permissions!(permissions)
                        if permissions.is_a?(String)
                            permissions = [permissions]
                        end

                        provided_access_token = params[:access_token]
                        bad_access_token_response_object = {
                            'errors' => [
                                Config.CONFIG[:api][:v2][:errors][:bad_access_token]
                            ]
                        }

                        if provided_access_token.nil?
                            status 401
                            respond_with bad_access_token_response_object
                        end

                        db_access_token = Models::ApiAccessToken.where(:access_token => provided_access_token).first

                        if db_access_token.nil?
                            status 401
                            respond_with bad_access_token_response_object
                        end

                        db_user = Models::User.where(:id => db_access_token.user_id).first

                        if db_user.nil?
                            user_permission_group = :viewer
                        else
                            user_permission_group = db_user.permission_group
                        end

                        permissions.each do |permission|
                            if !Config::Permissions.permission_group_contains? user_permission_group, permission
                                status 401
                                respond_with bad_access_token_response_object
                            end
                        end

                        return {
                            :user => db_user,
                            :access_token => db_access_token
                        }
                    end# has_permissions
                end# Helpers
            end# V2
        end# Api
    end# Routes
end# Onyx
