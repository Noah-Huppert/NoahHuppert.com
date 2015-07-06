require './app/models/helpers/permissions_helper'

module Onyx
  module Models
    class ApiAccessToken < Sequel::Model
        attr_accessor :permissions

        @permissions = Helpers.generate_permissions_hash 'api_access_token'
    end
  end
end
