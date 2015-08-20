require './app/models/helpers/permissions_helper'

module Onyx
  module Models
    class ApiAccessToken < Sequel::Model
        plugin :json_serializer

        @permissions = Helpers.generate_permissions_hash 'api_access_token'

        def self.generate
            api_access_token = ApiAccessToken.new

            api_access_token.access_token = SecureRandom.hex 32
            api_access_token.expires_on = DateTime.now + 14

            return api_access_token
        end

        class << self
            attr_accessor :permissions
        end
    end
  end
end
