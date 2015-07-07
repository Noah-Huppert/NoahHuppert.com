module Onyx
    module Config
        @_CONFIG = {
            :development => {
                :database => {
                    :host => 'localhost',
                    :port => 3306,
                    :database => 'onyx_dev',
                    :username => 'onyx_dev',
                    :password => 'password'
                }
            },
            :test => {
                :database => {
                    :host => '127.0.0.1',
                    :port => 3306,
                    :username => 'travis',
                    :password => ''
                }
            },
            :production => {
                :database => {
                    :host => ENV['OPENSHIFT_mysql_DB_HOST'],
                    :port => ENV['OPENSHIFT_mysql_DB_PORT'],
                    :username => ENV['OPENSHIFT_mysql_DB_USERNAME'],
                    :password => ENV['OPENSHIFT_mysql_DB_PASSWORD']
                }
            }
        }

        @CONFIG = @_CONFIG[ENV['RACK_ENV'].to_sym]

        class << self
            attr_accessor :CONFIG
        end
    end# Config
end# Onyx
