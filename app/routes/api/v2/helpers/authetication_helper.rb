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

                        provided_access_token = params[Config.CONFIG[:api][:v2][:access_token_key]]
                        user = Models::User.new
                        user.permission_group = :viewer

                        if !provided_access_token.nil?
                            raise 'Looks like we actually have an access_token'
                        end

                        return_payload = {
                            :user => user,
                            Config.CONFIG[:api][:v2][:access_token_key].to_sym => provided_access_token
                        }

                        permissions.each do |permission|
                            if !Config::Permissions.permission_group_contains? user.permission_group, permission
                                status 401

                                respond_with ({
                                    'errors' => [
                                        Config.CONFIG[:api][:v2][:errors][:bad_access_token]
                                    ]
                                })
                                return return_payload
                            end
                        end

                        return return_payload
                    end# has_permissions
                end# Helpers
            end# V2
        end# Api
    end# Routes
end# Onyx
