require './app/models/base'

module Onyx
    module Config
        @PERMISSION_GROUPS = {
            :viewer => [
                Models::Post.permissions[:self][:get],
                Models::Post.permissions[:peers][:get],
                Models::PostMeta.permissions[:self][:get],
                Models::PostMeta.permissions[:peers][:get]
            ],
            :user => [
                Models::User.permissions[:self][:get],
                Models::User.permissions[:self][:set],
                Models::User.permissions[:self][:delete],
                Models::User.permissions[:peers][:get],
                Models::ProviderAccessToken.permissions[:self][:identity][:get],
                Models::ProviderAccessToken.permissions[:self][:delete],
                Models::ApiAccessToken.permissions[:self][:get],
                Models::ApiAccessToken.permissions[:self][:delete]
            ],
            :creator => [
                Models::Post.permissions[:self][:set],
                Models::Post.permissions[:create],
                Models::PostMeta.permissions[:self][:set],
                Models::PostMeta.permissions[:create]
            ],
            :editor => [
                Models::Post.permissions[:self][:delete],
                Models::Post.permissions[:peers][:set],
                Models::Post.permissions[:peers][:delete],
                Models::PostMeta.permissions[:self][:delete],
                Models::PostMeta.permissions[:peers][:set],
                Models::PostMeta.permissions[:peers][:delete]
            ],
            :admin => [
                Models::User.permissions[:peers][:set],
                Models::User.permissions[:peers][:delete],
                Models::User.permissions[:create],
                Models::ProviderAccessToken.permissions[:self][:get],
                Models::ProviderAccessToken.permissions[:self][:set],
                Models::ProviderAccessToken.permissions[:peers][:get],
                Models::ProviderAccessToken.permissions[:peers][:set],
                Models::ProviderAccessToken.permissions[:peers][:delete],
                Models::ProviderAccessToken.permissions[:create],
                Models::ApiAccessToken.permissions[:self][:set],
                Models::ApiAccessToken.permissions[:peers][:get],
                Models::ApiAccessToken.permissions[:peers][:set],
                Models::ApiAccessToken.permissions[:peers][:delete],
                Models::ApiAccessToken.permissions[:create]
            ]
        }

        def self.permission_group_contains?(group, permission)
            @PERMISSION_GROUPS.each do |permission_group, permissions|
                if permissions.include? permission
                    return true
                end

                if permission_group == group
                    return false
                end
            end
        end# self.permission_group_contains?

        class << self
            attr_accessor :PERMISSION_GROUPS
        end
    end# Config
end# Onyx
