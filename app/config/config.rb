module Onyx
    module Config
        RACK_ENV = ENV['RACK_ENV'].to_sym

        @CONFIG = {
            :database => {
                :development => {
                    :host => '127.0.0.1',
                    :port => 5432,
                    :database => 'onyx_dev',
                    :username => 'onyx_dev',
                    :password => 'password'
                },
                :test => {
                    :host => '127.0.0.1',
                    :port => 5432,
                    :database => 'onyx_test',
                    :username => 'travis',
                    :password => ''
                },
                :production => {
                    :host => ENV['POSTGRESQL_DB_HOST'],
                    :port => ENV['POSTGRESQL_DB_PORT'],
                    :database => 'onyx',
                    :username => ENV['POSTGRESQL_DB_USERNAME'],
                    :password => ENV['POSTGRESQL_DB_PASSWORD']
                }
            }[RACK_ENV],
            :url => {
                :development => 'http://127.0.0.1:9292',
                :test => 'http://127.0.0.1:9292',
                :production => 'http://www.noahhuppert.com'
            }[RACK_ENV],
            :cookies => {
                :secret => ENV['COOKIES_SECRET'],
                :expire_after => 1209600# 2 weeks
            },
            :api => {
                :v2 => {
                    :root => '/api/v2',
                    :access_token_key => 'access_token',
                    :errors => {
                        :bad_access_token => 'bad_access_token'
                    },
                    :auth => {
                        :google => {
                            :api_root => 'https://accounts.google.com/',
                            :client_id => ENV['GOOGLE_CLIENT_ID'],
                            :client_secret => ENV['GOOGLE_CLIENT_SECRET'],
                            :errors => {
                                :google_retrieve_oauth_code_error => 'google_retrieve_oauth_code_error',
                                :google_retrieve_oauth_token_error => 'google_retrieve_oauth_token_error',
                                :google_retrieve_access_token_owner_info_error => 'google_retrieve_access_token_owner_info_error',
                                :insecure_state => 'insecure_state'
                            }
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
