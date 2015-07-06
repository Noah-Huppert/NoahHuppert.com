module Onyx
    module Models
        module Helpers
            def self.generate_permissions_hash(model_name)
                {
                    :self => {
                        :get => "#{model_name}.self.get",
                        :set => "#{model_name}.self.set",
                        :delete => "#{model_name}.self.delete"
                    },
                    :peers => {
                        :get => "#{model_name}.peers.get",
                        :set => "#{model_name}.peers.set",
                        :delete => "#{model_name}.peers.delete"
                    }
                }
            end# self.generate_permissions_hash
        end# Helpers
    end# Models
end# Onyx
