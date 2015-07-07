require './app/models/helpers/permissions_helper'

module Onyx
  module Models
    class User < Sequel::Model
        plugin :json_serializer

        @permissions = Helpers.generate_permissions_hash 'user'
        @permissions[:peers][:identity] = {:get => 'user.peers.identity.get'}

        class << self
            attr_accessor :permissions
        end
    end
  end
end
