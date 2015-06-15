module Onyx
  module Models
    class User < Sequel::Model
      plugin :json_serializer
    end
  end
end
