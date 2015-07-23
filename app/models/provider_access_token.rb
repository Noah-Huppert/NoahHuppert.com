require './app/models/helpers/permissions_helper'

module Onyx
  module Models
    class ProviderAccessToken < Sequel::Model
        plugin :json_serializer

        @permissions = Helpers.generate_permissions_hash 'provider_access_token'
        @permissions[:self][:identity] = { :get => 'provider_access_token.self.identity.get' }

        @providers = {
            :google => 'google'
        }

        class << self
            attr_accessor :permissions, :providers
        end
    end
  end
end
