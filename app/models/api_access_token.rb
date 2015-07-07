require './app/models/helpers/permissions_helper'

module Onyx
  module Models
    class ApiAccessToken < Sequel::Model
        @permissions = Helpers.generate_permissions_hash 'api_access_token'

        class << self
            attr_accessor :permissions
        end
    end
  end
end
