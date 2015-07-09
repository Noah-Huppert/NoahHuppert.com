module Onyx
    module Config
        RACK_ENV = ENV['RACK_ENV'].to_sym

        @CONFIG = {
            :database => {
                :development => {
                    :host => 'localhost',
                    :port => 3306,
                    :database => 'onyx_dev',
                    :username => 'onyx_dev',
                    :password => 'password'
                },
                :test => {
                    :host => '127.0.0.1',
                    :port => 3306,
                    :username => 'travis',
                    :password => ''
                },
                :production => {
                    :host => ENV['OPENSHIFT_mysql_DB_HOST'],
                    :port => ENV['OPENSHIFT_mysql_DB_PORT'],
                    :username => ENV['OPENSHIFT_mysql_DB_USERNAME'],
                    :password => ENV['OPENSHIFT_mysql_DB_PASSWORD']
                }
            }[RACK_ENV],
            :url => {
                :development => '127.0.0.1:9292',
                :test => '127.0.0.1:9292',
                :production => 'http://www.noahhuppert.com'
            }[RACK_ENV],
            :cookies_secret => ENV['COOKIES_SECRET'],
            :api => {
                :v2 => {
                    :root => '/api/v2',
                    :access_token_key => 'access_token',
                    :errors => {
                        :bad_access_token => 'bad_access_token'
                    },
                    :auth => {
                        :google => {
                            :client_id => ENV['GOOGLE_CLIENT_ID'],
                            :client_secret => ENV['GOOGLE_CLIENT_SECRET']
                        }
                    }
                }
            }
        }

        class << self
          attr_accessor :CONFIG
        end
    end# Config
end# Onyx
