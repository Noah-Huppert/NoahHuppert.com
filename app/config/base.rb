module Onyx
  module Config
=begin
    def self.load_permission_groups
      yaml = YAML.load_file(File.join(__dir__, 'permission_groups.yml'))
      groups = {}

      prev_permission_group = nil
      yaml.each do |permission_group, permission_keys|
        groups[permission_group] = []

        if !prev_permission_group.nil?
          groups[permission_group] = groups[prev_permission_group]
        end
        permission_keys.each do |permission_key|
          permission_key_parts = permission_key.split '.'

          groups[permission_group].push permission_key_parts.inject(@PERMISSIONS, :fetch)
        end

        prev_permission_group = permission_group
      end

      groups
    end

    @CONFIG = YAML.load_file(File.join(__dir__, 'config.yml'))[ENV['RACK_ENV']]

    if ENV['RACK_ENV'] == 'production'
      @CONFIG['host'] = ENV['OPENSHIFT_mysql_DB_HOST']
      @CONFIG['port'] = ENV['OPENSHIFT_mysql_DB_PORT']
      @CONFIG['username'] = ENV['OPENSHIFT_mysql_DB_USERNAME']
      @CONFIG['password'] = ENV['OPENSHIFT_mysql_DB_PASSWORD']
    end

    @PERMISSIONS = YAML.load_file(File.join(__dir__, 'permissions.yml'))
    @PERMISSION_GROUPS = load_permission_groups

    puts "#{YAML.load_file(File.join(__dir__, 'config.yml'))['production']}"


    class << self
      attr_accessor :CONFIG, :PERMISSIONS, :PERMISSION_GROUPS
    end
=end
  end# Config
end# Onyx
