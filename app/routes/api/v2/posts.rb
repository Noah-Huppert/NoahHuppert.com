module Onyx
    module Routes
        module Api
            module V2
                class Posts < Route
                    helpers Helpers

                    # Retrieves an array of Post ids
                    get "#{Config.CONFIG[:api][:v2][:root]}/posts" do
                        has_permissions! ([
                            Models::Post.permissions[:self][:get],
                            Models::Post.permissions[:peers][:get]
                        ])

                        post_ids = Models::Post.map :id

                        respond_with({
                            'posts' => post_ids,
                            'errors' => []
                        })
                    end# get

                    # Creates a post
                    post "#{Config.CONFIG[:api][:v2][:root]}/posts" do
                        has_permissions! Models::Post.permissions[:create]
                    end
                end# Posts
            end# V2
        end# Api
    end# Routes
end# Onyx
