require './app/models/helpers/permissions_helper'

module Onyx
  module Models
    class ProviderAccessToken < Sequel::Model
        @permissions = Helpers.generate_permissions_hash 'provider_access_token'
        @permissions[:self][:identity] = { :get => 'provider_access_token.self.identity.get'}

        class << self
            attr_accessor :permissions
        end
    end
  end
end
