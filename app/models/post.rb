require './app/models/helpers/permissions_helper'

module Onyx
  module Models
    class Post < Sequel::Model
        @permissions = Helpers.generate_permissions_hash 'post'

        class << self
            attr_accessor :permissions
        end
    end
  end
end
