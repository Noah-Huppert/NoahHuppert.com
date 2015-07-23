module Onyx
    module Threads
        Thread.new do
            sleep 3600# 1 hour

            api_access_tokens = Models::ApiAccessToken.select(:id, :expires_on).all
            now = DataTime.now

            api_access_tokens.each do |api_access_token|
                if api_access_token.expires_on <= now
                    api_access_token.delete
                end
            end
        end
    end# Threads
end# Onyx
