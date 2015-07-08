require './app/models/helpers/permissions_helper'

module Onyx
  module Models
    class ApiAccessToken < Sequel::Model
        @permissions = Helpers.generate_permissions_hash 'api_access_token'

        def self.retrieve_user
            puts "ApiAccessToken => #{self.instance_variables}"
        end

        class << self
            attr_accessor :permissions
        end
    end
  end
end
